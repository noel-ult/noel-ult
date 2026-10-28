# noel-ult: verification and operations

Reviewed against [default-branch commit 947e34ab0f73](https://github.com/noel-ult/noel-ult/commit/947e34ab0f73e3420086741bde18adb7f8d1fa9a) on 2026-10-28. Start with the [developer guide](PROJECT_GUIDE.md) for installation and architecture, and the [source reference](REFERENCE.md) for exact scripts, configuration readers, routes, and source locations.

## Profile and artwork

Review GitHub README rendering, animation/static fallback, alternative text, and all featured-project/social links. Use docs/ARTWORK.md when rebuilding assets.

These are acceptance scenarios for a maintainer to run in the documented environment. Their inclusion is not a claim that live integrations or production credentials were tested during this documentation update.

## Deployment and failure diagnosis

GitHub renders the default-branch README. Keep detailed maintenance material under docs/ and inspect generated artwork before replacing published assets.

## Maintaining the contract

When behavior changes, update the guide and examples in the same PR. Check the entry point and working directory before copying commands. Use the linked source readers to distinguish build-time configuration from process environment. For failures, capture the first application error, runtime version, selected mode, and redacted configuration names before later proxy or port errors.

Keep changes tied to evidence: a declared command is not proof it passes, a process health response is not a successful end-to-end workflow, and a historical report describes its own revision. Record actual check results and any unavailable external services in the PR.
