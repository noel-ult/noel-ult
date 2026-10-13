# GitHub profile maintenance

This repository is the GitHub profile repository for `noel-ult`. GitHub renders root `README.md` on the account's profile; it is not an application with a development server.

## Content and assets

`README.md` composes a hero picture, profile/social links, the command-deck illustration, and featured-project links. The `assets/` directory holds the GIF, PNG fallback, and SVG illustration. Preserve relative paths and meaningful image alternative text when replacing assets.

Update the Markdown links when project names or portfolio URLs change. Edit the SVG as a source asset if its embedded project text changes; changing a Markdown link does not update text drawn into an image. Preview GIF and PNG fallback separately and check the profile at a narrow viewport.

## Publishing and verification

There is no dependency installation, build command, environment configuration, or test suite. Review README rendering on GitHub, verify local asset paths, and open profile/project links. A merge to the default branch updates the profile's displayed README. Keep repository-maintenance documentation in `docs/` so the public profile remains focused on its intended content.

## More documentation

- [Source, command, and configuration reference](REFERENCE.md)
- [Contributing](../CONTRIBUTING.md)
