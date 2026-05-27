# Plan Mafer — GitHub Setup Guide
## Files to upload to your repo

Upload ALL of these to the root of your GitHub repo:

```
index.html      ← The entire app
manifest.json   ← PWA config (makes it installable)
sw.js           ← Service worker (makes it work offline)
icon-192.png    ← App icon 192×192 (see note below)
icon-512.png    ← App icon 512×512 (see note below)
```

## App Icons (you need to create these)

The app needs two icon images. Easiest way — free:

1. Go to https://favicon.io/favicon-generator/
2. Type "🍎" or "PM", pick a green background (#1B4332), white text
3. Download — it gives you a ZIP with icons
4. Rename the 192×192 file to `icon-192.png`
5. Rename the 512×512 file to `icon-512.png`
6. Upload both to your GitHub repo

## Enable GitHub Pages

1. Go to your repo on GitHub
2. Click **Settings** → **Pages** (left sidebar)
3. Under "Source" → select **Deploy from a branch**
4. Branch: **main** / Folder: **/ (root)**
5. Click Save
6. Wait ~2 minutes → your URL will be: `https://yourusername.github.io/plan-mafer`

## Test PWA install

1. Open the URL on your iPhone in Safari
2. Tap the Share button (box with arrow)
3. Tap "Add to Home Screen"
4. Done — it installs like a real app!

On Android Chrome, a banner will appear automatically after ~30 seconds.

## After Phase 2 (Firebase)

You'll also need:
- `firebase-config.js` → add to `.gitignore` so it's never public
- The Firebase SDK script tag in index.html (Claude will add it)

