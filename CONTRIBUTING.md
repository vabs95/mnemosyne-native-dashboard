# Contributing

Thanks for improving Mnemosyne Dashboard.

## Before opening a pull request

- Open an issue first for large behavior, data-access, or security model changes.
- Keep pull requests focused on one change.
- Do not include private memory databases, logs, credentials, screenshots with
  sensitive data, or local user paths.
- Follow the repository code of conduct.

## Local development

Use Python 3.11+ and Node 24+ to match the current CI setup.

```bash
python -m pip install --upgrade pytest ruff
python -m ruff check .
python -m ruff format --check .
python -m pytest -q
python -m compileall -q .
cd web
npm ci
npm run build
```

## Safety invariants

Please keep these invariants unless a change explicitly documents and tests a
different security model:

- The dashboard is mounted inside Hermes rather than run as a separate server.
- SQLite is opened through a read-only URI (`mode=ro`) for normal browsing paths.
- Memory admin/editing is disabled by default and only enabled explicitly in
  Settings.
- The frontend bundle is emitted to `dashboard/dist/index.js`.
- If network/auth/read-only behavior changes, update the docs and tests together.

## Pull request checklist

- [ ] Ruff passes.
- [ ] Pytest passes.
- [ ] Python compile check passes.
- [ ] `cd web && npm run build` passes.
- [ ] README/config docs updated for user-facing changes.
- [ ] Security notes updated if the network/auth/read-only model changes.
