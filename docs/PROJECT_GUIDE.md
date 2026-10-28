# GitHub profile maintenance

This repository is the GitHub profile repository for `noel-ult`. GitHub renders root `README.md` on the account's profile; it is not an application with a development server.

## Content and assets

`README.md` composes the animated inventor workbench, profile/social links, and four featured-project descriptions. `assets/workbench.gif` is the animation and `assets/workbench-still.png` is the static fallback. Preserve relative paths and meaningful image alternative text when replacing assets.

Update the Markdown links when project names or portfolio URLs change. The original illustration and prompt are in `assets/source/`; changing Markdown does not update text drawn into the artwork. Rebuild the animation with `node scripts/render-workbench.cjs` using Node.js, Playwright with Chromium, and FFmpeg. See [artwork maintenance](../assets/source/README.md) for environment overrides and timing. Preview GIF and PNG fallback separately and check the profile at a narrow viewport.

## Publishing and verification

The profile has no application build or test suite. Rebuilding artwork requires the tools documented above; displaying the checked-in assets requires no installation. Review README rendering on GitHub, verify local asset paths, and open profile/project links. A merge to the default branch updates the profile's displayed README. Keep repository-maintenance documentation in `docs/` so the public profile remains focused on its intended content.

## More documentation

- [Source, command, and configuration reference](REFERENCE.md)
- [Contributing](../CONTRIBUTING.md)
