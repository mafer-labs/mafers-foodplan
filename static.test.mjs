import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const [html, manifestText, serviceWorker, styles, app] = await Promise.all([
  readFile(new URL('./index.html', import.meta.url), 'utf8'),
  readFile(new URL('./manifest.json', import.meta.url), 'utf8'),
  readFile(new URL('./sw.js', import.meta.url), 'utf8'),
  readFile(new URL('./styles.css', import.meta.url), 'utf8'),
  readFile(new URL('./app.js', import.meta.url), 'utf8')
]);

test('all application scripts parse and are precached', async () => {
  const paths=[...html.matchAll(/<script src="([^"]+)"/g)].map(match=>match[1]);
  assert.ok(paths.length);
  for(const path of paths){
    const source=await readFile(new URL('./'+path,import.meta.url),'utf8');
    assert.doesNotThrow(()=>new Function(source));
    assert.ok(serviceWorker.includes("'./"+path+"'"),path+' must be precached');
  }
});

test('manifest has a stable install identity and scope', () => {
  const manifest = JSON.parse(manifestText);
  assert.equal(manifest.id, './');
  assert.equal(manifest.scope, './');
  assert.equal(manifest.start_url, './');
  assert.equal(manifest.display, 'standalone');
  assert.deepEqual(
    manifest.icons.map(icon => icon.sizes),
    ['192x192', '512x512']
  );
});

test('service worker parses and caches the complete local shell', () => {
  assert.doesNotThrow(() => new Function(serviceWorker));
  for (const asset of ['./index.html', './manifest.json', './icon-192.png', './icon-512.png']) {
    assert.match(serviceWorker, new RegExp(asset.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
});

test('basic resilience and accessibility protections remain enabled', () => {
  assert.doesNotMatch(html, /maximum-scale\s*=\s*1/i);
  assert.doesNotMatch(app, /JSON\.parse\(localStorage/);
  assert.match(app, /function escapeHTML\(/);
  assert.match(html, /aria-live="polite"/);
  assert.match(html, /role="progressbar"/);
});

test('mobile layout respects iPhone safe areas', () => {
  assert.match(styles, /env\(safe-area-inset-top, 0px\)/);
  assert.match(styles, /env\(safe-area-inset-bottom, 0px\)/);
  assert.match(styles, /--nav-total-h:\s+calc\(var\(--nav-h\) \+ var\(--safe-bottom\)\)/);
  assert.match(styles, /height:\s+var\(--nav-total-h\)/);
  assert.match(styles, /padding-bottom:\s+calc\(var\(--nav-total-h\) \+ 16px\)/);
});
