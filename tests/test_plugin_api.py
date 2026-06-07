from __future__ import annotations

import json
import sys
from pathlib import Path

import pytest
from fastapi import FastAPI
from fastapi.testclient import TestClient

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

from test_dashboard_core import make_db  # noqa: E402

from dashboard.plugin_api import router  # noqa: E402


@pytest.fixture
def app_client(tmp_path, monkeypatch):
    """Fixture to set up a mock Mnemosyne database, configurations, and FastAPI TestClient."""
    db_file = tmp_path / "mnemosyne.db"
    config_file = tmp_path / "config.json"

    # Initialize the test database schema and mock records
    make_db(db_file)

    # Pre-populate the configuration details
    config_file.write_text(json.dumps({"db_path": str(db_file), "memory_admin_enabled": False}), encoding="utf-8")

    # Set up environment overrides for mnemosyne config and db paths
    monkeypatch.setenv("MNEMOSYNE_DASHBOARD_DB", str(db_file))
    monkeypatch.setenv("MNEMOSYNE_DASHBOARD_CONFIG", str(config_file))
    monkeypatch.setenv("HERMES_HOME", str(tmp_path / "hermes"))

    # Instantiate a test FastAPI application and mount the plugin router
    app = FastAPI()
    app.include_router(router)
    client = TestClient(app)

    yield client


def test_health_check(app_client):
    """Test the /health API endpoint returns valid service diagnostics and state."""
    response = app_client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["ok"] is True
    assert data["service"] == "mnemosyne-native-dashboard"
    assert data["read_only"] is True


def test_get_config(app_client):
    """Test retrieving configuration details returns correct configuration metadata."""
    response = app_client.get("/config")
    assert response.status_code == 200
    data = response.json()
    assert data["ok"] is True
    assert "config" in data
    assert data["config"]["memory_admin_enabled"] is False


def test_update_config(app_client):
    """Test updating the configuration changes settings correctly."""
    # Toggle admin mode enabled
    response = app_client.post("/config", json={"memory_admin_enabled": True})
    assert response.status_code == 200
    data = response.json()
    assert data["ok"] is True
    assert data["config"]["memory_admin_enabled"] is True

    # Check that it persisted on subsequent GET
    get_resp = app_client.get("/config")
    assert get_resp.status_code == 200
    assert get_resp.json()["config"]["memory_admin_enabled"] is True


def test_get_diagnostics(app_client):
    """Test that the diagnostics endpoint reports SQLite database health status."""
    response = app_client.get("/diagnostics")
    assert response.status_code == 200
    data = response.json()
    assert data["exists"] is True
    assert data["readable"] is True
    assert "table_counts" in data


def test_get_stats(app_client):
    """Test database record metrics stats endpoint."""
    response = app_client.get("/stats")
    assert response.status_code == 200
    data = response.json()
    assert "counts" in data
    assert "working_memory" in data["counts"]
    assert "episodic_memory" in data["counts"]
    assert "triples" in data["counts"]


def test_get_memories(app_client):
    """Test searching/browsing stored memory entries with filter query parameters."""
    response = app_client.get("/memories?kind=working&limit=10")
    assert response.status_code == 200
    data = response.json()
    assert "items" in data
    # The default database created by make_db contains 4 working memory entries
    assert len(data["items"]) == 4


def test_get_single_memory(app_client):
    """Test fetching a single memory details by its unique identifier."""
    # Fetch existing memory w1
    response = app_client.get("/memory?id=w1")
    assert response.status_code == 200
    data = response.json()
    assert "item" in data
    assert data["item"]["id"] == "w1"

    # Fetch non-existent memory
    fail_response = app_client.get("/memory?id=invalid-id")
    assert fail_response.status_code == 404


def test_get_session_details(app_client):
    """Test retrieving metrics and lists relating to a specific session ID."""
    response = app_client.get("/session?id=s2&limit=5")
    assert response.status_code == 200
    data = response.json()
    assert "counts" in data
    assert "memories" in data
    assert data["counts"]["memories"] == 1


def test_get_triples(app_client):
    """Test retrieving semantic subject-predicate-object triples."""
    response = app_client.get("/triples?limit=10")
    assert response.status_code == 200
    data = response.json()
    assert "items" in data


def test_get_graph(app_client):
    """Test fetching relationship graph nodes and edges connectivity arrays."""
    response = app_client.get("/graph?limit=50")
    assert response.status_code == 200
    data = response.json()
    assert "nodes" in data
    assert "edges" in data


def test_get_consolidations(app_client):
    """Test retrieving consolidation history records."""
    response = app_client.get("/consolidations?limit=10")
    assert response.status_code == 200
    data = response.json()
    assert "items" in data


def test_admin_mutations_rejected_when_disabled(app_client):
    """Verify that administrative mutations fail with a 403 Forbidden when disabled."""
    # Ensure admin is disabled
    app_client.post("/config", json={"memory_admin_enabled": False})

    # Invalidate endpoint
    resp = app_client.post("/admin/memory/invalidate", json={"memory_id": "w1", "backup": False})
    assert resp.status_code == 403

    # Set importance endpoint
    resp = app_client.post("/admin/memory/importance", json={"memory_id": "w1", "importance": 0.8, "backup": False})
    assert resp.status_code == 403


def test_admin_mutations_allowed_when_enabled(app_client):
    """Verify that administrative mutations succeed when admin mode is enabled."""
    # Enable admin mode first
    app_client.post("/config", json={"memory_admin_enabled": True})

    # Invalidate (expire) memory w1
    resp = app_client.post("/admin/memory/invalidate", json={"memory_id": "w1", "backup": False})
    assert resp.status_code == 200
    assert resp.json()["backup"] is None  # no backup path because we set backup=False

    # Verify status changed to invalidated/superseded/expired
    get_resp = app_client.get("/memory?id=w1")
    assert get_resp.json()["item"]["status"] == "expired"

    # Update importance for memory w2
    resp_imp = app_client.post(
        "/admin/memory/importance", json={"memory_id": "w2", "importance": 0.85, "backup": False}
    )
    assert resp_imp.status_code == 200
    assert resp_imp.json()["item"]["importance"] == 0.85

    # Update veracity for memory w2
    resp_ver = app_client.post(
        "/admin/memory/veracity", json={"memory_id": "w2", "veracity": "stated", "backup": False}
    )
    assert resp_ver.status_code == 200
    assert resp_ver.json()["item"]["veracity"] == "stated"

    # Update expiry for memory w3
    resp_exp = app_client.post(
        "/admin/memory/expiry", json={"memory_id": "w3", "valid_until": "2026-06-12T15:00:00", "backup": False}
    )
    assert resp_exp.status_code == 200
    assert resp_exp.json()["item"]["valid_until"] == "2026-06-12T15:00:00"

    # Supersede memory w2 with new content
    resp_sup = app_client.post(
        "/admin/memory/supersede",
        json={"memory_id": "w2", "content": "Updated content by admin.", "importance": 0.9, "backup": False},
    )
    assert resp_sup.status_code == 200
    assert resp_sup.json()["replacement_id"] is not None

    # Check status of w2 is superseded
    get_w2 = app_client.get("/memory?id=w2")
    assert get_w2.json()["item"]["status"] == "superseded"


def test_plugin_registration_and_tools(tmp_path, monkeypatch):
    """Test that the plugin tools register correctly and handlers respond as expected."""
    # Ensure hermes home is isolated to the temp path
    monkeypatch.setenv("HERMES_HOME", str(tmp_path / "hermes"))
    db_file = tmp_path / "mnemosyne.db"
    monkeypatch.setenv("MNEMOSYNE_DASHBOARD_DB", str(db_file))

    import __init__ as plugin

    tools = {}

    class MockContext:
        def register_tool(self, name, toolset, schema, handler, check_fn, requires_env, description, emoji):
            tools[name] = {
                "toolset": toolset,
                "schema": schema,
                "handler": handler,
                "description": description,
                "emoji": emoji,
            }

    ctx = MockContext()
    plugin.register(ctx)

    assert "mnemosyne_native_dashboard_status" in tools
    assert "mnemosyne_native_dashboard_config" in tools

    # Test _status handler
    status_resp = json.loads(tools["mnemosyne_native_dashboard_status"]["handler"]())
    assert status_resp["ok"] is True
    assert status_resp["config"]["db_path"] == str(db_file)

    # Test _config handler read
    config_resp_read = json.loads(tools["mnemosyne_native_dashboard_config"]["handler"]())
    assert config_resp_read["ok"] is True
    assert config_resp_read["config"]["memory_admin_enabled"] is False

    # Test _config handler update
    config_resp_write = json.loads(
        tools["mnemosyne_native_dashboard_config"]["handler"]({"memory_admin_enabled": True})
    )
    assert config_resp_write["ok"] is True
    assert config_resp_write["config"]["memory_admin_enabled"] is True
