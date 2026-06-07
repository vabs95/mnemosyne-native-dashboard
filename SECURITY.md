# Security Policy

## Supported deployment model

Mnemosyne Dashboard is designed to run inside the Hermes web server as a read-only browsing surface by default.

The plugin itself does not enable memory maintenance unless the operator turns it on in Settings.

## Data access

The dashboard opens the SQLite database in read-only mode for normal browsing:

```text
file:<db_path>?mode=ro
```

When maintenance mode is enabled, write actions are explicit and limited to the admin endpoints exposed by the plugin. Keep the dashboard behind whatever access controls the Hermes deployment already uses.

## Reporting issues

Report security issues through private channels if available. Do not include private Mnemosyne memory content, database files, or session data in public reports.
