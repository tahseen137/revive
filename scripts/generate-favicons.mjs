import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const publicDir = join(__dirname, '..', 'public');

const svgBuffer = readFileSync(join(publicDir, 'icon.svg'));

// Generate apple-icon.png (180x180)
await sharp(svgBuffer)
  .resize(180, 180)
  .png()
  .toFile(join(publicDir, 'apple-icon.png'));

console.log('✅ Generated apple-icon.png (180x180)');

// Generate favicon.ico (32x32 PNG, then we'll rename)
// Note: Sharp doesn't generate .ico directly, but a 32x32 PNG works as favicon.ico
await sharp(svgBuffer)
  .resize(32, 32)
  .png()
  .toFile(join(publicDir, 'favicon-32.png'));

// Also generate a 16x16 version
await sharp(svgBuffer)
  .resize(16, 16)
  .png()
  .toFile(join(publicDir, 'favicon-16.png'));

console.log('✅ Generated favicon PNGs (16x16, 32x32)');

// Generate a 512x512 version for PWA
await sharp(svgBuffer)
  .resize(512, 512)
  .png()
  .toFile(join(publicDir, 'icon-512.png'));

console.log('✅ Generated icon-512.png for PWA');

// Generate a 192x192 version for PWA
await sharp(svgBuffer)
  .resize(192, 192)
  .png()
  .toFile(join(publicDir, 'icon-192.png'));

console.log('✅ Generated icon-192.png for PWA');

console.log('\n🎉 All favicons generated successfully!');
