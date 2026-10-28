const fs=require('node:fs'),path=require('node:path'),os=require('node:os');
const {spawnSync}=require('node:child_process');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const root=path.resolve(__dirname,'..'),out=path.join(root,'assets');
(async()=>{
 const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'noel-systems-'));let browser;
 try{
 browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_PATH||undefined});
 const page=await browser.newPage();await page.goto('file://'+path.join(__dirname,'artwork.html'));await page.evaluate(()=>window.ready);
 const save=(p,data)=>fs.writeFileSync(p,Buffer.from(data,'base64'));
 for(let n=0;n<96;n++)save(path.join(tmp,`${String(n).padStart(3,'0')}.png`),await page.evaluate(t=>art.hero(t),n/12));
 save(path.join(out,'systems-still.png'),await page.evaluate(()=>art.hero(8)));
 for(const [i,name]of ['reverse-escape','pageradar','truthlens','choru-vaari'].entries())save(path.join(out,`${name}.png`),await page.evaluate(i=>art.project(i),i));
 for(const [name,label,sub]of [['skills','FROM FIRST PRINCIPLES','FOUNDATIONS → SYSTEMS → EXPERIMENTS']])save(path.join(out,`${name}.png`),await page.evaluate(([l,s])=>art.section(l,s),[label,sub]));
 const result=spawnSync('ffmpeg',['-hide_banner','-loglevel','error','-y','-framerate','12','-i',path.join(tmp,'%03d.png'),'-filter_complex','split[a][b];[a]palettegen=max_colors=128:stats_mode=diff[p];[b][p]paletteuse=dither=bayer:bayer_scale=4:diff_mode=rectangle','-loop','0','-final_delay','600',path.join(out,'systems.gif')],{stdio:'inherit'});
 if(result.status!==0)throw Error('FFmpeg encoding failed');
 const size=fs.statSync(path.join(out,'systems.gif')).size;if(size>5e6)throw Error(`GIF exceeds 5 MB: ${size}`);
 console.log(`Artwork rendered. GIF ${(size/1e6).toFixed(2)} MB; 1200×500; 96 frames + final hold.`);
 }finally{if(browser)await browser.close();fs.rmSync(tmp,{recursive:true,force:true})}
})().catch(e=>{console.error(e);process.exitCode=1});
