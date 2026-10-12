/* Pure planning and validation helpers, shared by the browser and Node tests. */
(function(root) {
  'use strict';
  const integer = (n, min, max) => Number.isInteger(n) && n >= min && n <= max;
  const dateKey = value => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) && new Date(value + 'T12:00:00Z').toISOString().slice(0,10) === value;
  function validDate(value) { try { return dateKey(value); } catch { return false; } }
  function glucose(value, unit = 'mg/dL') {
    if (String(value).trim() === '') return '';
    const number = Number(value);
    const mg = unit === 'mmol/L' ? number * 18.016 : number;
    if (!Number.isFinite(mg) || mg < 20 || mg > 1000) throw new Error('glucose');
    return String(Math.round(mg * 100) / 100);
  }
  function mergeLogs(existing, incoming) {
    const seen = new Set();
    return [...existing, ...incoming].filter(log => {
      const key = `${log.timestamp || log.date}|${log.gluc}`;
      if (log.gluc && seen.has(key)) return false;
      if (log.gluc) seen.add(key);
      return true;
    }).sort((a,b) => (Date.parse(b.timestamp) || 0) - (Date.parse(a.timestamp) || 0));
  }
  function demand(days, people, meals) {
    const totals = {};
    for (const day of days) for (const type of ['b','l','d','sa','sp']) {
      for (const id of meals(day,type)) totals[id] = (totals[id] || 0) + people;
    }
    return totals;
  }
  function coverage(totals, inventory) {
    const rows = inventory.filter(item => item.portions > 0).slice().sort((a,b) =>
      (a.bestBefore || '9999').localeCompare(b.bestBefore || '9999') || a.frozen.localeCompare(b.frozen));
    const result = {};
    for (const [id,needed] of Object.entries(totals)) {
      let remaining = needed;
      const batches = [];
      for (const item of rows.filter(item => item.component === id)) {
        const portions = Math.min(remaining,item.portions);
        if (portions > 0) batches.push({id:item.id,portions});
        remaining -= portions;
        if (!remaining) break;
      }
      result[id] = {needed,available:needed-remaining,remaining,batches};
    }
    return result;
  }
  function validateInventory(items) {
    if (!Array.isArray(items) || items.length > 10000) throw new Error('inventory');
    const ids = new Set();
    return items.map(item => {
      if (!item || typeof item.id !== 'string' || !/^[a-zA-Z0-9_-]{1,100}$/.test(item.id) || ids.has(item.id) || typeof item.component !== 'string' ||
          !integer(item.portions,0,9999) || !validDate(item.frozen) ||
          (item.bestBefore && !validDate(item.bestBefore)) ||
          (item.bestBefore && item.bestBefore < item.frozen)) throw new Error('inventory');
      ids.add(item.id);
      return {id:item.id,component:item.component,name:String(item.name || '').slice(0,150),portions:item.portions,
        frozen:item.frozen,bestBefore:item.bestBefore || '',location:String(item.location || '').slice(0,150),note:String(item.note || '').slice(0,1000)};
    });
  }
  const api = {integer,validDate,glucose,mergeLogs,demand,coverage,validateInventory};
  root.PlanCore = api;
  if (typeof module !== 'undefined') module.exports = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
