import assert from 'node:assert/strict';
import test from 'node:test';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
function harness(initial={}) {
  const elements=new Map(),storage=new Map(Object.entries(initial));
  const el=id=>{
    if(!elements.has(id))elements.set(id,{value:'',textContent:'',innerHTML:'',hidden:false,checked:false,style:{},open:false,
      attrs:{},classList:{add(){},remove(){},toggle(){}},setAttribute(key,value){this.attrs[key]=value;},removeAttribute(key){delete this.attrs[key];},
      querySelector:()=>null,appendChild(){},focus(){document.activeElement=this;},showModal(){this.open=true;},close(){this.open=false;},addEventListener(){},click(){}});
    return elements.get(id);
  };
  const document={hidden:false,activeElement:el('trigger'),documentElement:{lang:'es'},getElementById:el,
    querySelectorAll:()=>[],querySelector:()=>el('dismiss'),addEventListener(){},createElement:()=>el('created')};
  const localStorage={getItem:key=>storage.get(key)??null,setItem:(key,value)=>{storage.set(key,String(value));},removeItem:key=>storage.delete(key)};
  const context=vm.createContext({document,window:{addEventListener(){},scrollTo(){}},navigator:{},localStorage,console,
    confirm:()=>true,setTimeout:()=>0,crypto:{randomUUID:()=> 'new-batch'},Blob,URL,Intl});
  for(const file of ['core.js','translations.js','meal-data.js','planning-data.js','app.js','kitchen.js'])vm.runInContext(readFileSync(new URL('./'+file,import.meta.url),'utf8'),context,{filename:file});
  const run=code=>vm.runInContext(code,context);
  const plain=code=>JSON.parse(JSON.stringify(run(code)));
  return {el,context,run,plain,storage,localStorage,document};
}
test('complete startup renders meals and kitchen in all three languages',()=>{
  const h=harness();h.run(readFileSync(new URL('./bootstrap.js',import.meta.url),'utf8'));
  for(const language of ['es','en','no']){
    h.run(`setLang('${language}')`);
    assert.ok(h.el('planContent').innerHTML.includes('card-d1_b'));
    assert.ok(h.el('kitchenContent').innerHTML.includes(h.run("ui('sunday')")));
    assert.equal(h.document.documentElement.lang,language);
  }
});
test('meal substitutions preserve sides and update ingredient totals',()=>{
  const h=harness();h.run('swapOverrides={d1_b:3,d4_l:2,d9_b:4}');
  assert.match(h.run("mealText(1,'b','en')"),/Shredded chicken.*arepa.*Avocado/i);
  assert.match(h.run("mealText(4,'l','en')"),/Baked fish.*Rice.*vegetables.*Salad/i);
  assert.match(h.run("mealText(9,'b','en')"),/plantain.*ground beef/i);
  assert.deepEqual(h.plain("mealParts(1,'b')"),['chicken','arepa','avocado']);
});
test('all plan and swap components exist, and translations cover every component',()=>{
  const h=harness();
  h.run(`for(let day=1;day<=10;day++)for(const type of ['b','l','d']){
    for(let i=-1;i<SWAPS[type].es.length;i++){
      swapOverrides=i<0?{}:{['d'+day+'_'+type]:i};
      for(const id of mealParts(day,type))if(!INGREDIENTS[id])throw new Error(id);
      for(const language of ['es','en','no'])if(!mealText(day,type,language))throw new Error(language);
    }
  }`);
});
test('invalid health reading is rejected and inputs retained',()=>{
  const h=harness();h.el('inputGluc').value='-5';h.el('inputNote').value='keep me';h.run('saveLog()');
  assert.equal(h.run('healthLogs.length'),0);assert.equal(h.el('inputNote').value,'keep me');assert.ok(h.el('logError').textContent);
});
test('health write failure preserves input and history without a success message',()=>{
  const h=harness();h.localStorage.setItem=()=>{throw new Error('quota');};
  h.el('inputGluc').value='95';h.run('saveLog()');
  assert.equal(h.run('healthLogs.length'),0);assert.equal(h.el('inputGluc').value,'95');assert.equal(h.el('toast').textContent,h.run("ui('saveFailed')"));
});
test('health entries can be saved, edited and individually removed',()=>{
  const h=harness();h.el('inputGluc').value='95';h.run('saveLog()');
  h.run('editLog(0)');h.el('inputSymp').value='updated';h.run('saveLog()');
  assert.equal(h.run('healthLogs.length'),1);assert.equal(h.run('healthLogs[0].symp'),'updated');
  h.run('deleteLog(0)');assert.equal(h.run('healthLogs.length'),0);
});
test('water interactions reset stale days before recording the new count',()=>{
  const h=harness();h.run("waterData={date:'2020-01-01',count:7};setWater(1)");
  assert.equal(h.run('waterData.count'),1);assert.equal(h.run('waterData.date'),h.run('localDateKey()'));
});
test('cycle reset keeps substitutions unless restore-original is selected',()=>{
  const h=harness();h.run('swapOverrides={d1_b:3};mealChecks={d1_b:true};activeDay=3;performReset()');
  assert.equal(h.run('activeDay'),1);assert.equal(h.run('swapOverrides.d1_b'),3);
  h.el('restoreMeals').checked=true;h.run('performReset()');assert.deepEqual(h.plain('swapOverrides'),{});
});
test('inventory use and undo update both stock and prep coverage',()=>{
  const h=harness();h.run("kitchen.inventory=[{id:'rice-1',component:'rice',portions:3,frozen:'2026-01-01',bestBefore:'',name:'',location:'A',note:''}]");
  h.run("useBatch('rice-1')");assert.equal(h.run('kitchen.inventory[0].portions'),2);
  h.run('undoStock()');assert.equal(h.run('kitchen.inventory[0].portions'),3);
  assert.equal(h.run('totalsAndCoverage().coverage.rice.available'),3);
});
test('failed inventory save leaves stock and planning state unchanged',()=>{
  const h=harness();h.run("kitchen.inventory=[{id:'rice-1',component:'rice',portions:3,frozen:'2026-01-01'}]");
  h.localStorage.setItem=()=>{throw new Error('quota');};h.run("useBatch('rice-1')");
  assert.equal(h.run('kitchen.inventory[0].portions'),3);
});
test('schedule distributes freezer portions once across meals',()=>{
  const h=harness();h.run("kitchen.days=[2,4];kitchen.inventory=[{id:'rice-1',component:'rice',portions:1,frozen:'2026-01-01',location:'BOX'}]");
  const schedule=h.run('buildSchedule(totalsAndCoverage().coverage)');
  assert.equal((schedule.match(/BOX/g)||[]).length,1);
});
test('backup exports and validates health, checks, substitutions and freezer inventory',()=>{
  const h=harness();h.run("waterData={date:localDateKey(),count:2};download=(name,content)=>{globalThis.exported=content};exportBackup()");
  const restored=h.plain('validateBackup(JSON.parse(exported))');
  assert.equal(restored.waterData.count,2);assert.equal(restored.kitchen.people,1);
  h.run('JSON.parse(exported).version=2');
  assert.throws(()=>h.run("validateBackup({app:'plan-mafer',version:2,data:{}})"));
});
test('failed transaction atomically preserves every previous storage value',()=>{
  const h=harness({mafer_checks:'old checks',mafer_swaps:'old swaps'});
  h.localStorage.setItem=()=>{throw new Error('quota');};
  assert.equal(h.run("storeTransaction({mafer_checks:{},mafer_swaps:{}})"),false);
  assert.equal(h.storage.get('mafer_checks'),'old checks');assert.equal(h.storage.get('mafer_swaps'),'old swaps');
});
test('snapshot restoration survives reload and subsequent saves update the snapshot',()=>{
  const h=harness();
  assert.equal(h.run("storeTransaction({mafer_lang:'en',mafer_checks:{d1_b:true}})"),true);
  h.run("writeStorage(STORAGE.lang,'no')");
  const restored=harness(Object.fromEntries(h.storage));
  assert.equal(restored.run('lang'),'no');assert.equal(restored.run('mealChecks.d1_b'),true);
});
test('malicious backup inventory identifiers are rejected before use in UI',()=>{
  const h=harness();h.run("waterData={date:localDateKey(),count:0};download=(name,content)=>{globalThis.exported=content};exportBackup()");
  assert.throws(()=>h.run(`let bad=JSON.parse(exported);bad.data.kitchen.inventory=[{id:"x');alert(1)//",component:'rice',portions:1,frozen:'2026-01-01'}];validateBackup(bad)`));
});
test('CSV escapes text that spreadsheet software could treat as a formula',()=>{
  const h=harness();h.run("healthLogs=[{timestamp:'2026-01-01',gluc:'95',symp:'=CMD()',note:'a,\"b'}];download=(name,content)=>{globalThis.csv=content};exportHealthCSV()");
  assert.match(h.run('csv'),/'=CMD\(\)/);assert.match(h.run('csv'),/a,""b/);
});
