// Renders index.html frame-by-frame to out/scam-reklamy.mp4 (1080x1920, 30 fps).
// Usage: node render.mjs [--fps 30] [--stills]
import { createRequire } from 'node:module';
import { spawn, execSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const require = createRequire(import.meta.url);
let playwright;
try { playwright = require('playwright'); }
catch { playwright = require(path.join(execSync('npm root -g').toString().trim(), 'playwright')); }

const args = process.argv.slice(2);
const fps = Number(args[args.indexOf('--fps') + 1]) || 30;
const stills = args.includes('--stills');

const dir = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(dir, 'out');
mkdirSync(outDir, { recursive: true });

const browser = await playwright.chromium.launch();
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
await page.goto(pathToFileURL(path.join(dir, 'index.html')).href + '?capture');
await page.evaluate(() => document.fonts.ready);
const duration = await page.evaluate(() => window.DURATION);

if (stills) {
  for (const t of [2.2, 6.5, 11, 15.5, 20, 24]) {
    await page.evaluate((t) => window.seek(t), t);
    await page.screenshot({ path: path.join(outDir, `still-${t}.png`) });
  }
  await browser.close();
  process.exit(0);
}

const outFile = path.join(outDir, 'scam-reklamy.mp4');
const ff = spawn('ffmpeg', [
  '-y', '-loglevel', 'error',
  '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'png', '-i', '-',
  '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '18', '-preset', 'medium',
  '-movflags', '+faststart', outFile,
], { stdio: ['pipe', 'inherit', 'inherit'] });

const frames = Math.round(duration * fps);
for (let i = 0; i < frames; i++) {
  await page.evaluate((t) => window.seek(t), i / fps);
  const buf = await page.screenshot({ type: 'png' });
  if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r));
  if (i % fps === 0) process.stdout.write(`\r${i}/${frames} frames`);
}
ff.stdin.end();
await new Promise((r) => ff.on('close', r));
await browser.close();
console.log(`\nSaved ${outFile}`);
