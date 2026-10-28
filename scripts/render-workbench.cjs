// Requires Node.js, Playwright with Chromium installed, and FFmpeg on PATH.
// PLAYWRIGHT_MODULE can point to an existing Playwright installation.
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const root = path.resolve(__dirname, '..');
const width = 1056, height = 704, fps = 10, seconds = 8;
const output = path.join(root, 'assets');

(async () => {
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'noel-workbench-'));
  let browser;
  try {
    browser = await chromium.launch({ headless: true, executablePath: process.env.CHROMIUM_PATH || undefined });
    const page = await browser.newPage();
    await page.setContent(`<canvas width="${width}" height="${height}"></canvas>`);
    const data = fs.readFileSync(path.join(output, 'source/workbench.png')).toString('base64');
    await page.evaluate(async (data) => {
      window.art = new Image();
      window.art.src = `data:image/png;base64,${data}`;
      await window.art.decode();
      window.render = (t, still = false) => {
        const canvas = document.querySelector('canvas');
        const c = canvas.getContext('2d');
        c.setTransform(0.6875, 0, 0, 0.6875, 0, 0);
        c.drawImage(window.art, 0, 0);
        const clamp = (n) => Math.max(0, Math.min(1, n));
        const ramp = (start, duration) => clamp((t - start) / duration);
        // The full desk is visible immediately; its instruments warm up gradually.
        if (!still && t < 1.2) {
          c.fillStyle = `rgba(13,9,5,${0.32 * (1 - ramp(0, 1.2))})`;
          c.fillRect(0, 0, 1536, 1024);
        }
        const active = !still && t < 7;
        // Radar sweep stays inside the circular glass, clear of the brass bezel.
        c.save();
        c.beginPath(); c.arc(1020, 334, 125, 0, Math.PI * 2); c.clip();
        const angle = -Math.PI / 2 + ramp(1.3, 3.7) * Math.PI * 2;
        const strength = still ? 0.11 : ramp(1.2, 0.6) * (active ? 0.28 : 0.11);
        for (let n = 0; n < 32; n++) {
          c.beginPath(); c.moveTo(1020, 334);
          c.arc(1020, 334, 125, angle - n * 0.014, angle - (n + 1) * 0.014, true);
          c.closePath(); c.fillStyle = `rgba(255,170,65,${strength * (1 - n / 32)})`; c.fill();
        }
        c.beginPath(); c.moveTo(1020, 334);
        c.lineTo(1020 + Math.cos(angle) * 122, 334 + Math.sin(angle) * 122);
        c.strokeStyle = '#e8b568'; c.lineWidth = 2; c.stroke();
        for (const [x, y] of [[1061, 278], [953, 365], [1068, 388]]) {
          c.beginPath(); c.arc(x, y, 3, 0, Math.PI * 2);
          c.fillStyle = '#f2bd73'; c.shadowColor = '#ffb348'; c.shadowBlur = 12; c.fill();
        }
        c.restore();
        // A short exploratory trace leads away from the miniature orange scout.
        const route = [[483,330],[483,342],[514,342],[514,369],[542,369],[542,393],[575,393],[575,422],[605,422]];
        const progress = still ? 1 : ramp(0.9, 3.2);
        const at = progress * (route.length - 1);
        c.save(); c.strokeStyle = '#ffb746'; c.lineWidth = 3;
        c.shadowColor = '#ff9e2b'; c.shadowBlur = 9;
        c.beginPath(); c.moveTo(...route[0]);
        for(let n=1;n<=Math.floor(at);n++) c.lineTo(...route[n]);
        const k = Math.min(Math.floor(at), route.length - 2), f = at - k;
        const x = route[k][0] + (route[k+1][0] - route[k][0]) * f;
        const y = route[k][1] + (route[k+1][1] - route[k][1]) * f;
        c.lineTo(x,y); c.stroke(); c.beginPath(); c.arc(x,y,4,0,Math.PI*2); c.fillStyle='#ffe0a0'; c.fill(); c.restore();
        // The image inspection pass completes once and then rests.
        if (active && t > 3 && t < 5.5) {
          const sx = 370 + ramp(3,2.5)*268;
          const g=c.createLinearGradient(sx-24,0,sx,0);
          g.addColorStop(0,'rgba(255,195,106,0)'); g.addColorStop(1,'rgba(255,195,106,.32)');
          c.fillStyle=g; c.fillRect(sx-24,610,24,163);
          c.fillStyle='#ffe0a0'; c.fillRect(sx,610,2,163);
        }
        // Connect the hand measurement to the plate without covering the rice.
        const hand = [[1208,797],[1190,742],[1182,687],[1190,650],[1202,689],[1205,621],[1215,610],[1226,680],[1232,614],[1242,620],[1247,689],[1262,648],[1272,651],[1270,718]];
        if (still || t > 4.6) {
          c.save(); c.globalAlpha=still ? .65 : ramp(4.6,1);
          c.strokeStyle='#df8b32'; c.lineWidth=1.5; c.beginPath(); c.moveTo(...hand[0]);
          hand.slice(1).forEach(p=>c.lineTo(...p)); c.stroke();
          for(const p of hand) {c.beginPath(); c.arc(...p,3,0,Math.PI*2); c.fillStyle='#ecae54'; c.fill();} c.restore();
        }
        // Final maker's stamp on the bottom note.
        if (still || t > 6.1) {
          c.save(); c.globalAlpha=still ? .9 : ramp(6.1,.35)*.9;
          c.translate(768,965); c.rotate(-.025);
          c.fillStyle='#eee0bb'; c.fillRect(-242,-15,484,32);
          c.strokeStyle='#85522f'; c.lineWidth=1.5; c.strokeRect(-242,-15,484,32);
          c.fillStyle='#75442b'; c.font='19px monospace'; c.textAlign='center';
          c.fillText('STILL FIGURING THINGS OUT. STILL BUILDING.',0,7); c.restore();
        }
        return canvas.toDataURL('image/png').split(',')[1];
      };
    }, data);
    for (let frame = 0; frame < seconds * fps; frame++) {
      const png = await page.evaluate(t => window.render(t), frame / fps);
      fs.writeFileSync(path.join(temp, `${String(frame).padStart(3,'0')}.png`), Buffer.from(png,'base64'));
    }
    const still = await page.evaluate(() => window.render(8, true));
    fs.writeFileSync(path.join(output,'workbench-still.png'), Buffer.from(still,'base64'));
    const result = spawnSync('ffmpeg', ['-hide_banner','-loglevel','error','-y','-framerate',String(fps),'-i',path.join(temp,'%03d.png'),'-filter_complex','split[a][b];[a]palettegen=max_colors=192:stats_mode=diff[p];[b][p]paletteuse=dither=bayer:bayer_scale=3:diff_mode=rectangle','-loop','0','-final_delay','600',path.join(output,'workbench.gif')], {stdio:'inherit'});
    if(result.status !== 0) throw new Error('FFmpeg encoding failed');
    const bytes=fs.statSync(path.join(output,'workbench.gif')).size;
    if(bytes > 5_000_000) throw new Error(`GIF exceeds 5 MB: ${bytes}`);
    console.log(`Rendered ${width}×${height}, ${seconds}s opening + 6s hold; GIF ${(bytes/1e6).toFixed(2)} MB`);
  } finally {
    if(browser) await browser.close();
    fs.rmSync(temp,{recursive:true,force:true});
  }
})().catch(error=>{console.error(error);process.exitCode=1;});
