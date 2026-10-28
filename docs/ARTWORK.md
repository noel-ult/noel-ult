# Systems in Motion artwork

The profile uses near-black (#080B12), graphite (#141C2B), silver (#E4EAF2), muted silver (#A7B5CA), and electric blue (#3D7EFF). Locally bundled Barlow Condensed, Space Grotesk, and JetBrains Mono fonts make rendering consistent; each font's OFL license is in assets/fonts/.

## Rebuild

Use Node.js, Playwright with Chromium installed, and FFmpeg on PATH. Install Playwright in a local environment with `npm install --no-save --package-lock=false playwright`, then install its browser with `npx playwright install chromium`. From the repository root run:

```sh
node scripts/render-assets.cjs
```

If using an existing installation, set `PLAYWRIGHT_MODULE` to its module path. `CHROMIUM_PATH` optionally selects an existing Chromium executable. The renderer reads scripts/artwork.html and the bundled fonts locally; rebuilding makes no network requests. Temporary frames are cleaned up.

The renderer writes a 1200 × 500 GIF and PNG, four 1200 × 240 project images, and a skills divider. The GIF has 96 frames at 12 fps, a six-second final hold, and infinite looping. Encoding rejects files above 5 MB. The initial frame already includes Noel's name; no content waits for playback.

The diagrams illustrate project concepts; they are not screenshots, real activity, or benchmark results. Native Markdown carries personal facts, skills, project descriptions, credits, and navigation. Image typography and colors are baked into the artwork; GitHub owns surrounding page styling. The README requests a static image for reduced-motion preferences and always supplies a still-image link. GitHub controls sanitization and playback.

## Verify

Inspect the GIF's opening, three scenes, and final hold. Preview the README on mobile and desktop with light/dark themes, checking every image loads and the page does not overflow. Test reduced-motion selection separately. Verify project descriptions against their linked repositories and personal facts against the portfolio. Do not add invented proficiency levels or usage metrics.
