# Workbench artwork

`workbench.png` is the original illustration generated with the built-in imagegen tool. The complete prompt is saved in [PROMPT.md](PROMPT.md). The source remains unmodified; browser Canvas adds the radar, maze trace, inspection pass, hand landmarks, lighting, and final stamp.

Rebuild from the repository root with Node.js, FFmpeg, and Playwright (including its Chromium browser):

```sh
node scripts/render-workbench.cjs
```

If Playwright is installed elsewhere, set `PLAYWRIGHT_MODULE` to its absolute module path. `CHROMIUM_PATH` optionally selects an installed Chromium executable. The renderer uses only local files and writes `assets/workbench.gif` and `assets/workbench-still.png`; temporary frames are removed when it exits.

The GIF has an eight-second opening at 10 fps and a six-second final hold, loops indefinitely, and must stay below 5 MB. The static version shows the completed scene. The README requests the static image for reduced-motion preferences and provides an explicit still link for clients that do not preserve picture media selection. GitHub controls image playback and sanitization; there are no custom animation controls or clickable objects inside the image.

The illustration is a visual metaphor, not a screenshot of any project. All project descriptions and navigation remain in Markdown. Project details were checked against public repository READMEs; the Choru Vaari entry credits the collaboration.
