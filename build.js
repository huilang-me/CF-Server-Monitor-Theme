#!/usr/bin/env node
import { execSync } from 'child_process';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, 'dist');
const publicDir = path.resolve(__dirname, 'public');

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
