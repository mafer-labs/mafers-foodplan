import {createRequire} from 'node:module';
import assert from 'node:assert/strict';
import test from 'node:test';
const core=createRequire(import.meta.url)('./core.js');
test('glucose converts mmol/L and rejects nonfinite or out-of-range inputs',()=>{
  assert.equal(core.glucose('5','mmol/L'),'90.08');
  assert.equal(core.glucose(''),'');
  for(const value of ['-5','0','19','1001','Infinity','NaN','abc'])assert.throws(()=>core.glucose(value));
});
test('merged glucose history stays chronological and deduplicates imports',()=>{
  const existing=[{timestamp:'2026-10-10T10:00:00Z',gluc:'95',note:'manual'}];
  const old={timestamp:'2026-09-01T10:00:00Z',gluc:'90'};
  const latest={timestamp:'2026-10-11T10:00:00Z',gluc:'100'};
  const result=core.mergeLogs(existing,[old,latest,old,existing[0]]);
  assert.deepEqual(result.map(l=>l.gluc),['100','95','90']);
  assert.equal(result[1].note,'manual');
});
test('demand scales to selected days and household size, including snacks',()=>{
  const totals=core.demand([1,3],2,(day,type)=>type==='sa'||type==='sp'?['fruit']:['rice']);
  assert.deepEqual(totals,{rice:12,fruit:8});
});
test('freezer coverage never allocates more than demand or double-counts a batch',()=>{
  const inventory=[{id:'old',component:'rice',portions:2,frozen:'2026-09-01',bestBefore:''},
    {id:'soon',component:'rice',portions:3,frozen:'2026-09-10',bestBefore:'2026-10-15'},
    {id:'fish',component:'fish',portions:0,frozen:'2026-09-01'}];
  const result=core.coverage({rice:4,fish:2},inventory);
  assert.deepEqual(result.rice,{needed:4,available:4,remaining:0,batches:[{id:'soon',portions:3},{id:'old',portions:1}]});
  assert.equal(result.fish.remaining,2);
  assert.equal(inventory[0].portions,2);
});
test('dates and inventory reject impossible dates, negative stock and unsafe identifiers',()=>{
  assert.equal(core.validDate('2026-02-30'),false);
  assert.equal(core.validDate('2024-02-29'),true);
  const item={id:'batch-1',component:'rice',portions:3,frozen:'2026-10-01'};
  assert.equal(core.validateInventory([item])[0].portions,3);
  for(const change of [{portions:-1},{id:"x');alert(1)//"},{bestBefore:'2026-09-01'},{frozen:'2026-99-01'}])assert.throws(()=>core.validateInventory([{...item,...change}]));
  assert.throws(()=>core.validateInventory([item,item]));
});
