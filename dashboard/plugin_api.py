"""FastAPI router mounting Mnemosyne Dashboard core endpoints.

Provides read and write APIs directly within the Hermes Agent web server,
mapping data from the local SQLite database via dashboard_core.py.
"""

from __future__ import annotations

import logging
import sys
from pathlib import Path

from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel, Field

# Ensure sibling plugin files are accessible in the Python path
_DIR = Path(__file__).resolve().parent.parent
if str(_DIR) not in sys.path:
    sys.path.insert(0, str(_DIR))

from dashboard.config import load_config, public_config, save_config
from dashboard.dashboard_core import DashboardStore, default_db_path

logger = logging.getLogger("hermes.plugin.mnemosyne-native-dashboard")
router = APIRouter()


def get_store() -> DashboardStore:
    """Retrieve an active store instance with the configured database path.

    Returns:
        DashboardStore: The helper store instantiated with the active DB path.
    """
    try:
        cfg = load_config(create=True)
        return DashboardStore(cfg.db_path or default_db_path())
    except Exception as e:
        logger.error(f"Failed to load Mnemosyne Dashboard config: {e}")
        return DashboardStore(default_db_path())


def require_admin():
    """Verify that memory administration mode is active in the settings.

    Raises:
        HTTPException: 403 status code if admin maintenance mode is disabled.
    """
    cfg = load_config(create=True)
    if not cfg.memory_admin_enabled:
        raise HTTPException(status_code=403, detail="Memory administration maintenance mode is disabled in settings.")


# --- API Models ---


class ConfigUpdateModel(BaseModel):
    db_path: str | None = Field(default=None, description="Path to the Mnemosyne SQLite file")
    memory_admin_enabled: bool | None = Field(default=None, description="Enable admin maintenance modifications")


class InvalidateMemoryModel(BaseModel):
    memory_id: str = Field(..., description="Unique ID of the memory to invalidate")
    backup: bool = Field(default=True, description="Create database backup before editing")


class SetImportanceModel(BaseModel):
    memory_id: str = Field(..., description="Unique ID of the memory")
    importance: float = Field(..., ge=0.0, le=1.0, description="Importance float value between 0.0 and 1.0")
    backup: bool = Field(default=True, description="Create database backup before editing")


class SetVeracityModel(BaseModel):
    memory_id: str = Field(..., description="Unique ID of the memory")
    veracity: str = Field(..., description="Veracity category (stated, inferred, tool, etc.)")
    backup: bool = Field(default=True, description="Create database backup before editing")


class SetExpiryModel(BaseModel):
    memory_id: str = Field(..., description="Unique ID of the memory")
    valid_until: str = Field(..., description="ISO 8601 expiry timestamp")
    backup: bool = Field(default=True, description="Create database backup before editing")


class SupersedeMemoryModel(BaseModel):
    memory_id: str = Field(..., description="Unique ID of the memory to supersede")
    content: str = Field(..., description="Replacement text content")
    importance: float | None = Field(default=None, ge=0.0, le=1.0, description="New importance rating")
    backup: bool = Field(default=True, description="Create database backup before editing")


# --- READ API Routes ---


@router.get("/health")
async def get_health():
    """Retrieve service health status, diagnostics state, and active configuration."""
    try:
        cfg = load_config(create=True)
        return {
            "ok": True,
            "service": "mnemosyne-native-dashboard",
            "read_only": not cfg.memory_admin_enabled,
            "config": public_config(cfg),
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) from e


@router.get("/config")
async def get_plugin_config():
    """Fetch the active configuration fields."""
    try:
        return {"ok": True, "config": public_config(load_config(create=True))}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) from e


@router.get("/diagnostics")
async def get_db_diagnostics():
    """Fetch database health diagnostic counters and checks."""
    try:
        return get_store().diagnostics()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) from e


@router.get("/stats")
async def get_dashboard_stats():
    """Fetch counts and summary breakdowns of stored memories and triples."""
    try:
        return get_store().stats()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) from e


@router.get("/digest/today")
async def get_today_digest(
    day: str = Query(default="", description="Date string in YYYY-MM-DD format"),
    limit: int = Query(default=80, ge=1, le=300),
):
    """Retrieve structured digest summary details for the specified day."""
    try:
        return get_store().today_digest(day=day, limit=limit)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) from e


@router.get("/review")
async def get_review_queues(
    queue: str = Query(default="contaminated", description="Queue type filter"),
    q: str = Query(default="", description="Search query string"),
    min_importance: str = Query(default="", description="Minimum importance filter"),
    limit: int = Query(default=100, ge=1, le=500),
    offset: int = Query(default=0, ge=0),
):
    """Retrieve lists of memories awaiting veracity/importance review."""
    try:
        return get_store().review_queues(queue=queue, q=q, min_importance=min_importance, limit=limit, offset=offset)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) from e


@router.get("/lifecycle")
async def get_lifecycle_queues(limit: int = Query(default=50, ge=1, le=200)):
    """Fetch degradation and consolidation queues for lifecycle visualization."""
    try:
        return get_store().lifecycle_dashboard(limit=limit)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) from e


@router.get("/profile/inferred")
async def get_inferred_profile(limit: int = Query(default=10, ge=1, le=30)):
    """Fetch active inferred profile segments derived from episodic data."""
    try:
        return get_store().inferred_profile(limit_per_section=limit)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) from e


@router.get("/patterns")
async def get_pattern_insights(limit: int = Query(default=10, ge=1, le=30)):
    """Fetch discovered behavioral pattern structures and insights."""
    try:
        return get_store().pattern_insights(limit=limit)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) from e


@router.get("/constellation")
async def get_constellation_map(limit: int = Query(default=240, ge=40, le=600)):
    """Fetch coordinate layouts of memories for 3D constellation rendering."""
    try:
        return get_store().constellation(limit=limit)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) from e


@router.get("/search")
async def get_search_results(
    q: str = Query(default="", description="Global search text query"), limit: int = Query(default=30, ge=1, le=100)
):
    """Retrieve search matches across memories, consolidations, and triples."""
    try:
        return get_store().global_search(q=q, limit=limit)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) from e


@router.get("/recall-debug")
async def get_recall_debugging(
    q: str = Query(default="", description="Recall test query"), limit: int = Query(default=20, ge=1, le=100)
):
    """Fetch debug rankings and recall vector similarity matches."""
    try:
        return get_store().recall_debug(q=q, limit=limit)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) from e


@router.get("/timeline")
async def get_timeline(
    q: str = Query(default="", description="Search query filter"),
    group: str = Query(default="day", description="Grouping method (day, session)"),
    limit: int = Query(default=300, ge=1, le=1000),
):
    """Fetch chronological event list groups."""
    try:
        return get_store().timeline(q=q, group=group, limit=limit)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) from e


@router.get("/memories")
async def get_memories_list(
    kind: str = Query(default="all"),
    q: str = Query(default=""),
    source: str = Query(default=""),
    scope: str = Query(default=""),
    session_id: str = Query(default=""),
    sort: str = Query(default="recent"),
    status: str = Query(default="active"),
    veracity: str = Query(default=""),
    degradation_tier: str = Query(default=""),
    contaminated_only: str = Query(default=""),
    degraded_only: str = Query(default=""),
    due_for_degradation: str = Query(default=""),
    limit: int = Query(default=100, ge=1, le=500),
    offset: int = Query(default=0, ge=0),
):
    """Browse stored memories using customizable filtering parameters."""
    try:
        items = get_store().list_memories(
            kind=kind,
            q=q,
            source=source,
            scope=scope,
            session_id=session_id,
            sort=sort,
            status=status,
            veracity=veracity,
            degradation_tier=degradation_tier,
            contaminated_only=contaminated_only,
            degraded_only=degraded_only,
            due_for_degradation=due_for_degradation,
            limit=limit,
            offset=offset,
        )
        return {"items": items}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) from e


@router.get("/memory")
async def get_single_memory(id: str = Query(..., description="Memory unique identifier")):
    """Fetch a single memory details by its unique identifier ID."""
    try:
        item = get_store().get_memory(id)
        if not item:
            raise HTTPException(status_code=404, detail="Memory not found")
        return {"item": item}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) from e


@router.get("/session")
async def get_session_details(
    id: str = Query(..., description="Session identifier"), limit: int = Query(default=200, ge=1, le=500)
):
    """Retrieve memories, counts, and metadata for a specific session ID."""
    try:
        return get_store().session_detail(id, limit=limit)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) from e


@router.get("/triples")
async def get_triples(
    q: str = Query(default=""),
    subject: str = Query(default=""),
    predicate: str = Query(default=""),
    object_: str = Query(default="", alias="object"),
    limit: int = Query(default=200, ge=1, le=1000),
):
    """Browse extracted triple facts matching exact subject/predicate/object filters."""
    try:
        items = get_store().triples(q=q, subject=subject, predicate=predicate, object_=object_, limit=limit)
        return {"items": items}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) from e


@router.get("/graph")
async def get_relationship_graph(q: str = Query(default=""), limit: int = Query(default=300, ge=1, le=1000)):
    """Retrieve node and edge connectivity arrays for interactive graph visualization."""
    try:
        return get_store().graph(q=q, limit=limit)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) from e


@router.get("/consolidations")
async def get_consolidations(q: str = Query(default=""), limit: int = Query(default=100, ge=1, le=500)):
    """Fetch episodic consolidation history records."""
    try:
        items = get_store().consolidations(q=q, limit=limit)
        return {"items": items}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) from e


# --- MEMORIA (3.x Spec) API Routes ---


@router.get("/memoria/stats")
async def get_memoria_stats():
    """Retrieve diagnostics for Memoria 3.x schema tables."""
    try:
        return get_store().memoria_stats()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) from e


@router.get("/memoria/facts")
async def get_memoria_facts(
    q: str = Query(default=""), limit: int = Query(default=200, ge=1, le=1000), offset: int = Query(default=0, ge=0)
):
    """Browse Memoria factual knowledge assertions."""
    try:
        items = get_store().memoria_facts(q=q, limit=limit, offset=offset)
        return {"items": items}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) from e


@router.get("/memoria/timelines")
async def get_memoria_timelines(
    q: str = Query(default=""), limit: int = Query(default=200, ge=1, le=1000), offset: int = Query(default=0, ge=0)
):
    """Browse Memoria chronological timeline logs."""
    try:
        items = get_store().memoria_timelines(q=q, limit=limit, offset=offset)
        return {"items": items}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) from e


@router.get("/memoria/instructions")
async def get_memoria_instructions(
    q: str = Query(default=""), limit: int = Query(default=200, ge=1, le=1000), offset: int = Query(default=0, ge=0)
):
    """Browse Memoria execution rules and instructions."""
    try:
        items = get_store().memoria_instructions(q=q, limit=limit, offset=offset)
        return {"items": items}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) from e


@router.get("/memoria/kg")
async def get_memoria_kg(
    q: str = Query(default=""), limit: int = Query(default=200, ge=1, le=1000), offset: int = Query(default=0, ge=0)
):
    """Browse Memoria semantic relationships."""
    try:
        items = get_store().memoria_kg(q=q, limit=limit, offset=offset)
        return {"items": items}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) from e


@router.get("/memoria/preferences")
async def get_memoria_preferences(
    q: str = Query(default=""), limit: int = Query(default=200, ge=1, le=1000), offset: int = Query(default=0, ge=0)
):
    """Browse Memoria user/agent settings preferences."""
    try:
        items = get_store().memoria_preferences(q=q, limit=limit, offset=offset)
        return {"items": items}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) from e


# --- WRITE / MUTATIVE API Routes ---


@router.post("/config")
async def update_plugin_config(body: ConfigUpdateModel):
    """Save modified settings variables to the config file."""
    try:
        updates = {k: v for k, v in body.model_dump().items() if v is not None}
        cfg = save_config(**updates)
        return {
            "ok": True,
            "config": public_config(cfg),
            "message": "Configuration saved successfully. Database changes take effect immediately.",
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) from e


@router.post("/admin/backup")
async def create_db_backup():
    """Create a timed copy of the configured database file."""
    require_admin()
    try:
        return {"ok": True, "backup": get_store().backup_database()}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) from e


@router.get("/admin/audit")
async def get_audit_logs(limit: int = Query(default=100, ge=1, le=1000)):
    """Fetch log file lines tracking admin alterations."""
    require_admin()
    try:
        return {"items": get_store().audit_log(limit=limit)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) from e


@router.post("/admin/memory/invalidate")
async def post_invalidate_memory(body: InvalidateMemoryModel):
    """Mark a memory veracity status as invalidated/deleted."""
    require_admin()
    try:
        return get_store().invalidate_memory(body.memory_id, backup=body.backup)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) from e


@router.post("/admin/memory/importance")
async def post_set_importance(body: SetImportanceModel):
    """Update a memory's importance score."""
    require_admin()
    try:
        return get_store().set_memory_importance(body.memory_id, body.importance, backup=body.backup)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) from e


@router.post("/admin/memory/veracity")
async def post_set_veracity(body: SetVeracityModel):
    """Update a memory's veracity category classification."""
    require_admin()
    try:
        return get_store().set_memory_veracity(body.memory_id, body.veracity, backup=body.backup)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) from e


@router.post("/admin/memory/expiry")
async def post_set_expiry(body: SetExpiryModel):
    """Set or remove explicit expiration dates on a memory."""
    require_admin()
    try:
        return get_store().set_memory_expiry(body.memory_id, body.valid_until, backup=body.backup)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) from e


@router.post("/admin/memory/supersede")
async def post_supersede_memory(body: SupersedeMemoryModel):
    """Replace an existing memory with a new one, creating an audit connection link."""
    require_admin()
    try:
        return get_store().supersede_memory(body.memory_id, body.content, body.importance, backup=body.backup)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) from e
