import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const [html, manifestText, serviceWorker] = await Promise.all([
  readFile(new URL('./index.html', import.meta.url), 'utf8'),
  readFile(new URL('./manifest.json', import.meta.url), 'utf8'),
  readFile(new URL('./sw.js', import.meta.url), 'utf8')
]);

test('inline application JavaScript parses', () => {
  const match = html.match(/<script>([\s\S]*?)<\/script>/);
  assert.ok(match, 'index.html must contain an inline application script');
  assert.doesNotThrow(() => new Function(match[1]));
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
  assert.doesNotMatch(html, /JSON\.parse\(localStorage/);
  assert.match(html, /function escapeHTML\(/);
  assert.match(html, /aria-live="polite"/);
  assert.match(html, /role="progressbar"/);
});
