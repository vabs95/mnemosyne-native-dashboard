from __future__ import annotations

import json
import os
from dataclasses import asdict, dataclass
from pathlib import Path
from typing import Any

# Global plugin name determines configuration and audit locations
PLUGIN_NAME = "mnemosyne-native-dashboard"


def hermes_home() -> Path:
    """Resolve the base .hermes directory path from the environment or system home."""
    return Path(os.environ.get("HERMES_HOME", str(Path.home() / ".hermes")))


def default_db_path() -> Path:
    """Find the standard Mnemosyne SQLite database location based on common environment settings."""
    candidates = [
        os.environ.get("MNEMOSYNE_DASHBOARD_DB"),
        os.environ.get("MNEMOSYNE_DB_PATH"),
        os.environ.get("MNEMOSYNE_DB"),
        hermes_home() / "mnemosyne" / "data" / "mnemosyne.db",
        hermes_home() / "mnemosyne.db",
        Path.home() / ".mnemosyne" / "mnemosyne.db",
    ]
    expanded = [Path(c).expanduser() for c in candidates if c]
    for path in expanded:
        if path.exists():
            return path
    return expanded[3] if len(expanded) > 3 else hermes_home() / "mnemosyne" / "data" / "mnemosyne.db"


def data_dir() -> Path:
    """Get the active directory where plugin configuration and data are saved."""
    path = hermes_home() / "plugin-data" / PLUGIN_NAME
    path.mkdir(parents=True, exist_ok=True)
    return path


def config_path() -> Path:
    """Get the path to the config.json file."""
    return data_dir() / "config.json"


@dataclass(frozen=True)
class DashboardConfig:
    db_path: str = ""
    memory_admin_enabled: bool = False


def _defaults() -> dict[str, Any]:
    """Retrieve standard default options for first-time setup."""
    return {
        "db_path": str(default_db_path()),
        "memory_admin_enabled": False,
    }


def _bool(value: Any) -> bool:
    """Safely parse boolean representations from strings or standard booleans."""
    if isinstance(value, bool):
        return value
    if isinstance(value, str):
        return value.strip().lower() in {"1", "true", "yes", "on", "enabled"}
    return bool(value)


def _validate(raw: dict[str, Any]) -> DashboardConfig:
    """Create a validated DashboardConfig instance from raw parameters."""
    merged = {**_defaults(), **{k: v for k, v in raw.items() if v is not None}}
    db_path = str(Path(str(merged.get("db_path") or default_db_path())).expanduser())
    return DashboardConfig(
        db_path=db_path,
        memory_admin_enabled=_bool(merged.get("memory_admin_enabled", False)),
    )


def _write_config(cfg: DashboardConfig) -> None:
    """Save the configuration parameters directly to config.json."""
    path = config_path()
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(asdict(cfg), ensure_ascii=False, indent=2) + "\n")


def load_config(create: bool = True) -> DashboardConfig:
    """Load configuration variables, merging saved JSON settings and environment overrides."""
    path = config_path()
    raw: dict[str, Any] = {}
    needs_write = False

    if path.exists():
        try:
            raw = json.loads(path.read_text() or "{}")
        except Exception:
            raw = {}
    elif create:
        raw = _defaults()
        needs_write = True

    # Support runtime database path overrides via environment variables
    env_db = os.environ.get("MNEMOSYNE_DASHBOARD_DB")
    if env_db:
        raw["db_path"] = env_db

    cfg = _validate(raw)
    if create and (needs_write or not path.exists()):
        _write_config(cfg)
    return cfg


def save_config(**updates: Any) -> DashboardConfig:
    """Update configuration attributes and persist them to config.json."""
    current = asdict(load_config(create=True))
    current.update({k: v for k, v in updates.items() if v is not None})
    cfg = _validate(current)
    _write_config(cfg)
    return cfg


def public_config(cfg: DashboardConfig | None = None) -> dict[str, Any]:
    """Retrieve safe metadata dictionary of settings intended for frontend display."""
    cfg = cfg or load_config(create=True)
    return {
        "db_path": cfg.db_path,
        "memory_admin_enabled": cfg.memory_admin_enabled,
    }


def effective_config(overrides: dict[str, Any] | None = None) -> DashboardConfig:
    """Merge runtime settings overrides onto the loaded configuration parameters."""
    cfg = asdict(load_config(create=True))
    if overrides:
        cfg.update({k: v for k, v in overrides.items() if v is not None})
    return _validate(cfg)
