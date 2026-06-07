# Security Policy

## Supported deployment model

Mnemosyne Dashboard is designed to run inside the Hermes web server as a
read-only browsing surface by default.

The plugin itself does not enable memory maintenance unless the operator turns it
on in Settings.

## Supported versions

This project is currently pre-1.0. Security fixes are applied to the default
branch and the latest released version.

## Data access

The dashboard opens the SQLite database in read-only mode for normal browsing:

```text
file:<db_path>?mode=ro
```

When maintenance mode is enabled, write actions are explicit and limited to the
admin endpoints exposed by the plugin. Keep the dashboard behind whatever access
controls the Hermes deployment already uses.

## Reporting issues

Use GitHub private vulnerability reporting when it is enabled for this
repository. If private vulnerability reporting is not available, open a public
issue asking for a preferred private contact path without sharing vulnerability
details.

Do not include private Mnemosyne memory content, database files, credentials,
session data, or sensitive logs in public reports.

Please include:

- Affected version or commit.
- Description of the impact.
- Reproduction steps or proof of concept, if safe to share privately.
- Any known mitigations.
