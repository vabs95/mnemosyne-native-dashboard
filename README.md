# Mnemosyne Dashboard

Mnemosyne Dashboard is the native Hermes tab for browsing a local Mnemosyne
memory store. It ships as a plugin-mounted FastAPI router plus a React frontend
bundle served from the Hermes gateway.

The live dashboard is mounted at `/mnemosyne`.

## Acknowledgements

This project builds on work from
[Wysie/mnemosyne-dashboard](https://github.com/Wysie/mnemosyne-dashboard) and on
the Hermes integration path from
[AxDSan/mnemosyne](https://github.com/AxDSan/mnemosyne). It packages a native
Hermes dashboard for browsing Mnemosyne memory data inside Hermes. Thanks to
both projects for the foundation and setup path.

## What It Provides

- Overview metrics for working, episodic, triple, and consolidation data
- Today, Memories, Graph, Visualiser, Context Bank, History, and Settings tabs
- Read-only browsing by default
- Optional admin maintenance actions that stay disabled until explicitly enabled
  in Settings
- SQLite diagnostics and table counts for the active database

## Repository Layout

- `plugin.yaml` - Hermes plugin metadata and tool registration
- `__init__.py` - Hermes plugin entry points for status and config
- `dashboard/manifest.json` - Hermes tab mount configuration and frontend entrypoint
- `dashboard/plugin_api.py` - FastAPI routes for the dashboard
- `dashboard/dashboard_core.py` - SQLite access and memory queries
- `dashboard/config.py` - Runtime config persistence and environment overrides
- `dashboard/dist/` - Built dashboard assets served by Hermes
- `web/` - React source for the dashboard UI
- `tests/` - API and core storage tests

## Local Development

Build the frontend bundle:

```bash
cd web
npm run build
```

Run the Python tests:

```bash
pytest
```

## Current Setup Notes

- The dashboard is integrated into the Hermes web server; there is no separate
  app process to run.
- The frontend bundle is emitted to `dashboard/dist/index.js`.
- Settings controls whether memory maintenance mode is enabled.
- The plugin reads the SQLite database in read-only mode for normal browsing.

## Open Source Setup

- License: MIT.
- Security policy: see [SECURITY.md](SECURITY.md).
- Contribution guide: see [CONTRIBUTING.md](CONTRIBUTING.md).
- Code of conduct: see [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).
- GitHub repository setup checklist: see [docs/GITHUB_SETUP.md](docs/GITHUB_SETUP.md).
