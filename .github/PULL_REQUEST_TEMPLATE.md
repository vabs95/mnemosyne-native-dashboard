# Pull Request

## Summary

Describe the change.

## Validation

- [ ] `python -m ruff check .`
- [ ] `python -m ruff format --check .`
- [ ] `python -m pytest -q`
- [ ] `python -m compileall -q .`
- [ ] `cd web && npm run build`
- [ ] `cd web && npm run typecheck`

## Safety

- [ ] The dashboard remains read-only by default.
- [ ] Maintenance/write actions remain disabled unless explicitly enabled in Settings.
- [ ] Network, auth, or data-access behavior changes are documented and tested.
