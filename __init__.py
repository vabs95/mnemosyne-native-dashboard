from __future__ import annotations

import json
import sys
from pathlib import Path
from typing import Any

# Hermes loads filesystem plugins from outside the plugin directory, so sibling
# modules are not always on sys.path during gateway startup. Keep the import
# compatible with both plugin loading and direct script/dev usage.
_PLUGIN_DIR = Path(__file__).resolve().parent
if str(_PLUGIN_DIR) not in sys.path:
    sys.path.insert(0, str(_PLUGIN_DIR))

from dashboard.config import DashboardConfig, config_path, effective_config, load_config, public_config, save_config

PLUGIN_NAME = "mnemosyne-native-dashboard"


def _json(obj: Any) -> str:
    return json.dumps(obj, ensure_ascii=False, indent=2)


def _coerce_cfg(args: dict[str, Any] | None = None) -> DashboardConfig:
    args = args or {}
    return effective_config(
        {
            "db_path": args.get("db_path") or args.get("db"),
            "memory_admin_enabled": args.get("memory_admin_enabled"),
        }
    )


def _status(args=None, **kw):
    cfg = _coerce_cfg(args)
    return _json(
        {
            "ok": True,
            "running": True,
            "reachable": True,
            "integrated": True,
            "tab_path": "/mnemosyne",
            "config": public_config(cfg),
            "config_file": str(config_path()),
        }
    )


def _config(args=None, **kw):
    args = args or {}
    updates = {k: args.get(k) for k in ("db_path", "memory_admin_enabled") if args.get(k) not in (None, "")}
    cfg = save_config(**updates) if updates else load_config(create=True)
    return _json(
        {
            "ok": True,
            "config": public_config(cfg),
            "config_file": str(config_path()),
            "message": "Config saved." if updates else "Current config.",
        }
    )


def register(ctx):
    cfg = load_config(create=True)
    ctx.register_tool(
        name="mnemosyne_native_dashboard_status",
        toolset="mnemosyne-native-dashboard",
        schema={
            "name": "mnemosyne_native_dashboard_status",
            "description": "Check Mnemosyne memory dashboard status.",
            "parameters": {
                "type": "object",
                "properties": {
                    "db_path": {"type": "string", "default": cfg.db_path},
                },
            },
        },
        handler=_status,
        check_fn=lambda: True,
        requires_env=[],
        description="Mnemosyne dashboard status",
        emoji="📊",
    )
    ctx.register_tool(
        name="mnemosyne_native_dashboard_config",
        toolset="mnemosyne-native-dashboard",
        schema={
            "name": "mnemosyne_native_dashboard_config",
            "description": "Read or update default Mnemosyne dashboard config.",
            "parameters": {
                "type": "object",
                "properties": {
                    "db_path": {"type": "string", "description": "Mnemosyne SQLite DB path."},
                    "memory_admin_enabled": {"type": "boolean", "description": "Enable memory maintenance mode."},
                },
            },
        },
        handler=_config,
        check_fn=lambda: True,
        requires_env=[],
        description="Configure Mnemosyne dashboard",
        emoji="⚙️",
    )
