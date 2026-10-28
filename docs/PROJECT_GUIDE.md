# GitHub profile maintenance

This repository is the GitHub profile repository for `noel-ult`. GitHub renders root `README.md` on the account's profile; it is not an application with a development server.

## Content and assets

`README.md` combines the Systems in Motion animated identity, introduction, four featured projects, local AI/systems experiments, grouped skills, and social links. `assets/systems.gif` is the animation and `assets/systems-still.png` is the static fallback. Preserve relative paths, credits, and descriptive alternative text.

Update Markdown when personal details or projects change. Rebuild artwork with `node scripts/render-assets.cjs` using Node.js, Playwright with Chromium, and FFmpeg. [Artwork maintenance](ARTWORK.md) documents sources, font licenses, tool setup, environment overrides, and verification.

## Publishing and verification

The profile has no application build or test suite. Rebuilding artwork requires the tools documented above; displaying the checked-in assets requires no installation. Review README rendering on GitHub, verify local asset paths, and open profile/project links. A merge to the default branch updates the profile's displayed README. Keep repository-maintenance documentation in `docs/` so the public profile remains focused on its intended content.

## More documentation

- [Source, command, and configuration reference](REFERENCE.md)
- [Contributing](../CONTRIBUTING.md)
