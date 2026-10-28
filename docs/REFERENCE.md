# noel-ult source reference

This repository renders the root README on the GitHub profile. It has no application routes or runtime configuration.

| Source | Purpose |
| --- | --- |
| [README](../README.md) | Profile introduction, project descriptions, and navigation |
| [Artwork source](../assets/source/README.md) | Illustration, generation prompt, rebuild instructions, and playback limitations |
| [Animation renderer](../scripts/render-workbench.cjs) | Local Canvas rendering and FFmpeg GIF encoding |
| [Project guide](PROJECT_GUIDE.md) | Maintenance and publishing checks |

The renderer optionally accepts `PLAYWRIGHT_MODULE` and `CHROMIUM_PATH` to use existing local tool installations. It produces the GIF and static PNG referenced by the profile.
