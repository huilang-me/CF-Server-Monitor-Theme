#!/usr/bin/env node
import { execSync } from 'child_process';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, 'dist');
const publicDir = path.resolve(__dirname, 'public');

console.log('Generating config.json from environment variables...');
fs.ensureDirSync(publicDir);
const apiBase = process.env.API_BASE
  ? process.env.API_BASE.split(',').map(s => s.trim()).filter(Boolean)
  : [];
const title = process.env.TITLE || '';
const backgroundImage = process.env.BACKGROUND_IMAGE || '';
const config = { apiBase, title, backgroundImage };
fs.writeFileSync(
  path.join(publicDir, 'config.json'),
  JSON.stringify(config, null, 2),
  'utf8'
);
console.log('Generated config.json:', JSON.stringify(config));

console.log('Cleaning dist directory...');
if (fs.existsSync(distDir)) {
  fs.removeSync(distDir);
}

console.log('Building theme frontend...');
execSync('npx vite build', { cwd: __dirname, stdio: 'inherit' });

console.log('Copying static assets...');
if (fs.existsSync(publicDir)) {
  fs.copySync(publicDir, distDir, { overwrite: true });
  console.log('Copied public/ to dist/');
}

console.log('Replacing timestamp in index.html...');
const indexHtmlPath = path.join(distDir, 'index.html');
if (fs.existsSync(indexHtmlPath)) {
  const timestamp = Date.now();
  let html = fs.readFileSync(indexHtmlPath, 'utf8');
  html = html.replace(/(\?t=)\d+/g, `$1${timestamp}`);
  fs.writeFileSync(indexHtmlPath, html, 'utf8');
  console.log(`Updated timestamp to ${timestamp}`);
}

console.log('Build complete!');
