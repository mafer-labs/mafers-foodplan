import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
function worker() {
  const events={},deleted=[],added=[];
  const cache={addAll:async files=>added.push(...files),match:async url=>({url,cached:true})};
  const context=vm.createContext({URL,Request,Set,Promise,caches:{open:async()=>cache,keys:async()=>['other-app','plan-mafer-v2','plan-mafer-v3','plan-mafer-v4','plan-mafer-v5'],delete:async key=>deleted.push(key)},
    self:{location:{origin:'https://example.com'},registration:{scope:'https://example.com/mafers-foodplan/'},clients:{claim:async()=>{}},addEventListener:(name,fn)=>events[name]=fn},fetch:()=>{throw new Error('offline');}});
  vm.runInContext(readFileSync(new URL('./sw.js',import.meta.url),'utf8'),context);
  return {events,deleted,added};
}
test('worker installation atomically precaches all split app files',async()=>{
  const w=worker();let completion;
  w.events.install({waitUntil:p=>completion=p});await completion;
  for(const file of ['app.js','kitchen.js','core.js','bootstrap.js','styles.css','kitchen.css'])assert.ok(w.added.some(request=>request.url.endsWith('/'+file)));
  assert.ok(w.added.every(request=>request.cache==='reload'),'new shell must bypass stale HTTP responses');
});
test('worker activation only removes this app older caches',async()=>{
  const w=worker();let completion;
  w.events.activate({waitUntil:p=>completion=p});await completion;
  assert.deepEqual(w.deleted,['plan-mafer-v2','plan-mafer-v3','plan-mafer-v4']);
});
test('offline navigation and script requests return the installed scoped shell',async()=>{
  const w=worker();let response;
  w.events.fetch({request:{method:'GET',url:'https://example.com/mafers-foodplan/',mode:'navigate'},respondWith:p=>response=p});
  assert.equal((await response).url,'https://example.com/mafers-foodplan/index.html');
  w.events.fetch({request:{method:'GET',url:'https://example.com/mafers-foodplan/kitchen.js'},respondWith:p=>response=p});
  assert.equal((await response).cached,true);
});
