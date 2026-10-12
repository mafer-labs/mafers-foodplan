# Plan Mafer 🍎

Static, local-first meal planner and installable PWA in Spanish, English and Norwegian.

## What you can do

- Follow the original 10-day plan, mark meals complete and substitute meals. Breakfast/lunch substitutions retain the original sides; dinner substitutions replace the dinner.
- Generate lunch and dinner ideas.
- Track daily water and health readings. Edit/delete individual entries, record measurement time and choose mg/dL or mmol/L. Storage uses mg/dL internally.
- Import Apple Health glucose XML with unit conversion, deduplication and chronological ordering. Unsupported units and invalid readings are skipped. The current importer accepts XML files up to 25 MB to limit main-thread memory use; larger exports need a smaller glucose-only XML extract.
- Choose plan days and household size in **Kitchen**. Selected days are scheduled in numeric order, beginning on the chosen first-meal date (default: next Monday).
- Get a Saturday shopping checklist, Sunday batch-prep quantities, fresh finishing reminders and daily freezer-use/thaw guidance.
- Track prepared freezer components, portions, freeze dates, locations, notes and optional quality reminder dates. Add/edit/delete batches, use one portion or undo the last inventory change. Custom batches are supported but not automatically allocated.
- Download a shopping checklist, a full JSON backup or health CSV; restore a validated backup.

## Planning quantities

The source plan contains meal descriptions rather than complete weighed recipes. Shopping totals therefore count **component portions**, not raw ingredient weights. One portion means one component for one person at one meal. Use the original meal card for quantities, and your recipes for raw ingredients, sauces and seasonings. This is stated beside the lists in the app.

Freezer coverage matches prepared component IDs (for example cooked chicken or rice). It prioritizes the earliest optional quality reminder, then the oldest freeze date, and never allocates more portions than available. Confirm that preparation and portion size suit the intended meal; batch notes can record these details. The allocation is a planning preview, not a stock deduction. Deduct stock with **Use 1 portion** when taking food out. Each planning run includes all selected days; it does not subtract previously checked meal-progress cards.

Record only food actually frozen, using **Record frozen portions** on a prep task. Stock changes immediately recalculate shopping and preparation shortfalls. Produce, salads, eggs and other fresh components stay on the fresh-finishing list. The ingredient map includes both snacks and all original meals/substitutions.

Safety copy links to [USDA leftovers guidance](https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/leftovers-and-food-safety). Quality reminder dates are user chosen and are not safety expiry dates. Meal content and nutritional targets remain the original personal plan; the app does not provide individualized medical advice or clinical glucose thresholds.

## Run locally

Serve the repository through a static HTTP server, for example:

```sh
npx serve .
```

Opening the HTML as a file does not enable PWA/offline functionality. The service worker caches the complete versioned shell and activates after old tabs close, avoiding mixed HTML/script versions. Close existing app tabs and reopen after a release to activate its waiting worker.

## Tests

Node.js 20 or newer; no runtime or test dependencies:

```sh
npm test
```

Tests cover planning and freezer allocation, substitutions, glucose validation/conversion, failed writes, midnight rollover, health editing, backup validation/atomic restoration, CSV escaping, scoped offline caching, syntax and mobile safe-area styles. The app integration tests use a lightweight DOM harness; real browser layout and installed-device PWA behavior should also be checked before release. GitHub Actions runs the suite on pushes and pull requests.

## Data and privacy

All app data is stored in browser `localStorage`; XML and backup imports are processed locally. There is no account or server sync. Browser data deletion removes records, so keep downloaded backups. Save failures display a message; health form data is retained when a write fails. Restore replaces current app data only after validation and confirmation through one atomic snapshot write, leaving current data intact if saving fails.

Existing `mafer_*` keys are preserved. New kitchen data uses `mafer_kitchen`, and the glucose display preference uses `mafer_unit`. After a restore or cycle reset, `mafer_state` holds a single snapshot and subsequent writes update that snapshot. Full backups include health, water, progress, substitutions and freezer/planning data; CSV always labels canonical glucose values as mg/dL. Backups and CSV files contain personal health information, so store them somewhere you trust.

## Source layout

- `index.html`, `styles.css`, `kitchen.css`: structure and presentation.
- `translations.js`, `meal-data.js`, `planning-data.js`: localized content and structured component mappings.
- `core.js`: pure validation, sorting and allocation helpers.
- `app.js`: original plan, water, health import and PWA interactions.
- `kitchen.js`: planning/freezer UI, health editor and backup/export.
- `bootstrap.js`: initialization and daily rollover listeners.
- `sw.js`, `manifest.json`: offline/install support.
