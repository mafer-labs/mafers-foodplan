/* Kitchen, data portability and health editor UI. No server or runtime dependencies. */
const EXTRA = {
  kitchen:['Cocina','Kitchen','Kjøkken'],intro:['Planifica la semana, prepara el fin de semana y usa tu congelador.','Plan your week, prepare on the weekend and use your freezer.','Planlegg uken, forbered i helgen og bruk fryseren.'],
  weekStart:['Fecha de la primera comida','First meal date','Dato for første måltid'],people:['Personas','People','Personer'],chooseDays:['Selecciona los días del plan; se programan en orden.','Choose plan days; they are scheduled in order.','Velg plandager; de planlegges i rekkefølge.'],
  prep:['Preparación','Weekend prep','Helgeforberedelser'],shopping:['Compras','Shopping','Innkjøp'],freezer:['Congelador','Freezer','Fryser'],
  backup:['Respaldo y restauración','Backup and restore','Sikkerhetskopi og gjenoppretting'],backupInfo:['Los datos se quedan en este dispositivo. Descarga un respaldo antes de borrar datos del navegador.','Data stays on this device. Download a backup before clearing browser data.','Data lagres på denne enheten. Last ned en kopi før du sletter nettleserdata.'],
  downloadBackup:['Descargar respaldo','Download backup','Last ned sikkerhetskopi'],exportCSV:['CSV de salud','Health CSV','Helse-CSV'],restoreBackup:['Restaurar respaldo (reemplaza los datos actuales)','Restore backup (replaces current data)','Gjenopprett kopi (erstatter nåværende data)'],
  resetCycle:['Reiniciar ciclo','Reset cycle','Nullstill syklus'],resetInfo:['Reinicia el progreso al día 1. Se conservan los registros de salud y congelador.','Reset progress to day 1. Health and freezer records are kept.','Nullstill fremdrift til dag 1. Helse- og fryserdata beholdes.'],restoreMeals:['Restaurar también las comidas originales','Restore original meals too','Gjenopprett også originale måltider'],
  cancel:['Cancelar','Cancel','Avbryt'],edit:['Editar','Edit','Rediger'],delete:['Eliminar','Delete','Slett'],save:['Guardar','Save','Lagre'],
  units:['Unidad de glucosa','Glucose units','Glukoseenhet'],measurementTime:['Fecha y hora de medición (opcional)','Measurement date and time (optional)','Måletidspunkt (valgfritt)'],
  addBatch:['Añadir lote congelado','Add frozen batch','Legg til fryst parti'],component:['Componente preparado','Prepared component','Tilberedt komponent'],name:['Nombre','Name','Navn'],portions:['Porciones de comida','Meal portions','Måltidsporsjoner'],frozen:['Fecha de congelación','Frozen on','Fryst dato'],
  bestBefore:['Recordatorio de calidad (opcional)','Quality reminder date (optional)','Kvalitetspåminnelse (valgfritt)'],location:['Ubicación / recipiente','Location / container','Plassering / beholder'],notes:['Notas / tamaño de porción','Notes / portion size','Notater / porsjonsstørrelse'],
  saveFailed:['No se pudo guardar. Conserva los datos y descarga un respaldo.','Could not save. Keep your data and download a backup.','Kunne ikke lagre. Behold dataene og last ned en sikkerhetskopi.'],
  invalidGlucose:['Introduce un valor entre 20–1000 mg/dL (o su equivalente en mmol/L).','Enter a value between 20–1000 mg/dL (or its mmol/L equivalent).','Oppgi en verdi mellom 20–1000 mg/dL (eller tilsvarende mmol/L).'],
  invalidDate:['Revisa la fecha; no puede estar en el futuro.','Check the date; it cannot be in the future.','Kontroller datoen; den kan ikke være i fremtiden.'],largeFile:['El archivo supera 25 MB. Importa un XML más pequeño.','File exceeds 25 MB. Import a smaller XML file.','Filen er over 25 MB. Importer en mindre XML-fil.'],
  none:['Selecciona al menos un día para generar el plan.','Choose at least one day to generate a plan.','Velg minst én dag for å lage en plan.'],
  portionHelp:['Una porción corresponde a un componente para una persona en una comida. Usa las cantidades de la tarjeta original; las compras son un resumen de componentes, no pesos de ingredientes crudos.','One portion is one component for one person at one meal. Use quantities on the original meal card; shopping totals list components, not raw ingredient weights.','Én porsjon er én komponent for én person i ett måltid. Bruk mengdene på måltidskortet; innkjøpslisten viser komponenter, ikke råvarevekter.'],
  saturday:['Sábado · revisar y comprar','Saturday · review and shop','Lørdag · gjennomgå og handle'],saturdayTask:['Revisa las porciones del congelador y compra lo que falta. Comprueba las recetas y condimentos.','Check freezer portions and shop for what is missing. Check recipes and seasonings.','Kontroller fryserporsjoner og kjøp det som mangler. Sjekk oppskrifter og krydder.'],
  sunday:['Domingo · cocinar y congelar','Sunday · cook and freeze','Søndag · tilbered og frys'],sundayTask:['Cocina por componentes según las recetas del plan; divide, enfría rápidamente y etiqueta cada porción. Añade al congelador sólo lo que hayas congelado.','Cook components using your plan recipes; portion, cool promptly and label each batch. Add only what you have actually frozen.','Tilbered komponenter etter planens oppskrifter; porsjoner, avkjøl raskt og merk hvert parti. Registrer bare det du faktisk har fryst.'],
  prepare:['Porciones por preparar','Portions to prepare','Porsjoner å tilberede'],inStock:['Porciones del congelador previstas','Freezer portions allocated','Tildelte fryserporsjoner'],needed:['Porciones necesarias','Portions needed','Porsjoner som trengs'],
  freezeNow:['Registrar porciones congeladas','Record frozen portions','Registrer fryste porsjoner'],fresh:['Terminar fresco durante la semana','Finish fresh during the week','Fullfør ferskt i løpet av uken'],freshHelp:['Prepara ensaladas, aguacate, huevos y guarniciones frescas el día de la comida. Verifica las cantidades de cada tarjeta.','Prepare salads, avocado, eggs and fresh sides on the meal day. Check quantities on each meal card.','Tilbered salat, avokado, egg og ferskt tilbehør på måltidsdagen. Sjekk mengdene på hvert måltidskort.'],
  schedule:['Plan de uso y descongelación','Use and thaw schedule','Bruks- og tineplan'],thaw:['La noche anterior: pasar al refrigerador','Previous evening: move to the refrigerator','Kvelden før: flytt til kjøleskapet'],
  safety:['Enfría rápidamente en recipientes poco profundos y refrigera dentro de 2 horas (1 hora si hace más de 32 °C). Descongela en el refrigerador. Recalienta sobras a 74 °C.','Cool promptly in shallow containers and refrigerate within 2 hours (1 hour above 32 °C). Thaw in the refrigerator. Reheat leftovers to 74 °C / 165 °F.','Avkjøl raskt i grunne beholdere og sett kaldt innen 2 timer (1 time over 32 °C). Tin i kjøleskapet. Varm rester til 74 °C.'],
  safetySource:['Guía USDA de sobras y congelación','USDA leftovers and freezing guidance','USDA-veiledning for rester og frysing'],qualityInfo:['La fecha es un recordatorio de calidad elegido por ti, no una garantía de seguridad. Mantén el congelador a −18 °C o menos.','The date is a quality reminder you choose, not a safety guarantee. Keep the freezer at −18 °C / 0 °F or below.','Datoen er en kvalitetspåminnelse du velger, ikke en sikkerhetsgaranti. Hold fryseren ved −18 °C eller kaldere.'],
  shoppingHelp:['Las porciones ya asignadas del congelador se descuentan. Marca lo que ya tienes o compraste.','Allocated freezer portions are subtracted. Check off what you already have or bought.','Tildelte fryserporsjoner trekkes fra. Kryss av det du allerede har eller har kjøpt.'],
  custom:['Otro (sin asignación automática)','Other (no automatic allocation)','Annet (ingen automatisk tildeling)'],emptyFreezer:['Tu congelador está vacío. Registra el primer lote.','Your freezer is empty. Add your first batch.','Fryseren er tom. Registrer første parti.'],
  useOne:['Usar 1 porción','Use 1 portion','Bruk 1 porsjon'],undo:['Deshacer último cambio','Undo last change','Angre siste endring'],useSoon:['Revisar calidad','Review quality','Vurder kvalitet'],stockHelp:['Se asignan primero los lotes con recordatorio más cercano, luego los más antiguos. Al sacar comida, registra la porción usada.','Allocate batches with the earliest reminder first, then the oldest. When taking food out, record the portion used.','Partier med nærmeste påminnelse tildeles først, deretter de eldste. Registrer porsjonen når du tar ut mat.'],
  batchInvalid:['Revisa porciones, nombre y fechas. La fecha de calidad debe ser posterior a la de congelación.','Check portions, name and dates. The quality date must be on or after the freezing date.','Kontroller porsjoner, navn og datoer. Kvalitetsdatoen må være på eller etter frysedatoen.'],
  confirmDelete:['¿Eliminar este registro?','Delete this record?','Slette denne oppføringen?'],confirmRestore:['¿Reemplazar todos los datos locales con este respaldo?','Replace all local data with this backup?','Erstatte alle lokale data med denne sikkerhetskopien?'],
  invalidBackup:['Respaldo inválido o incompatible. Los datos actuales no se cambiaron.','Invalid or incompatible backup. Current data was not changed.','Ugyldig eller inkompatibel sikkerhetskopi. Nåværende data er ikke endret.'],restored:['Respaldo restaurado.','Backup restored.','Sikkerhetskopi gjenopprettet.'],
  planningInvalid:['Selecciona una fecha válida y entre 1 y 20 personas.','Choose a valid date and between 1 and 20 people.','Velg en gyldig dato og mellom 1 og 20 personer.'],
  fullCoverage:['Ya hay suficientes porciones en el congelador.','Your freezer already covers this component.','Fryseren dekker allerede denne komponenten.'],
  batchEdit:['Editar lote','Edit batch','Rediger parti'],exportShopping:['Descargar lista','Download list','Last ned liste'],
  original:['Ver día','View day','Vis dag'],remaining:['Quedan','Remaining','Gjenstår']
};
function ui(key) {return EXTRA[key]?.[{es:0,en:1,no:2}[lang]] || key;}
function ingredient(id) {return INGREDIENTS[id]?.[{es:0,en:1,no:2}[lang]] || id;}
let glucoseUnit=readStorage(STORAGE.unit)==='mmol/L'?'mmol/L':'mg/dL';
let editLogIndex=null;
function displayGlucose(value) {return glucoseUnit==='mmol/L'?Number(value)/18.016:Number(value);}
function formatGlucose(value) {return (glucoseUnit==='mmol/L'?displayGlucose(value).toFixed(1):String(value))+' '+glucoseUnit;}
function applyExtraLanguage() {
  document.querySelectorAll('[data-ui]').forEach(el=>el.textContent=ui(el.dataset.ui));
  const input=document.getElementById('inputGluc');
  input.min=glucoseUnit==='mmol/L'?String(20/18.016):'20';
  input.max=glucoseUnit==='mmol/L'?String(1000/18.016):'1000';
  input.placeholder=glucoseUnit==='mmol/L'?'5.3':'95';
  document.getElementById('lblGluc').textContent=t('glucoseLabel')+' ('+glucoseUnit+')';
  document.getElementById('glucoseUnit').value=glucoseUnit;
  document.getElementById('inputSymp').placeholder={es:'ej: fatiga leve',en:'e.g. mild fatigue',no:'f.eks. lett tretthet'}[lang];
  document.getElementById('inputNote').placeholder={es:'ej: comí tarde',en:'e.g. ate late',no:'f.eks. spiste sent'}[lang];
}
function changeGlucoseUnit(unit) {
  if(!['mg/dL','mmol/L'].includes(unit)) return;
  if(!writeStorage(STORAGE.unit,unit)){document.getElementById('glucoseUnit').value=glucoseUnit;return;}
  const input=document.getElementById('inputGluc');
  if(input.value) try {const canonical=PlanCore.glucose(input.value,glucoseUnit);input.value=unit==='mmol/L'?(Number(canonical)/18.016).toFixed(2):canonical;}catch{input.value='';}
  glucoseUnit=unit;applyExtraLanguage();renderLogs();renderSparkline();
}
function cancelLogEdit() {
  editLogIndex=null;
  ['inputGluc','inputSymp','inputNote','logTime'].forEach(id=>document.getElementById(id).value='');
  document.getElementById('logError').textContent='';
  document.getElementById('inputGluc').removeAttribute('aria-invalid');
  document.getElementById('cancelEdit').hidden=true;
}
function editLog(index) {
  const log=healthLogs[index];if(!log)return;
  editLogIndex=index;
  document.getElementById('logTime').value='';
  document.getElementById('inputGluc').value=log.gluc?displayGlucose(log.gluc).toFixed(glucoseUnit==='mmol/L'?2:0):'';
  document.getElementById('inputSymp').value=log.symp;
  document.getElementById('inputNote').value=log.note;
  if(log.timestamp) {const d=new Date(log.timestamp); if(Number.isFinite(d.getTime())) document.getElementById('logTime').value=new Date(d.getTime()-d.getTimezoneOffset()*60000).toISOString().slice(0,16);}
  document.getElementById('cancelEdit').hidden=false;
  document.getElementById('inputGluc').focus();
}
function deleteLog(index) {
  if(!healthLogs[index]||!confirm(ui('confirmDelete')))return;
  const next=healthLogs.filter((_,i)=>i!==index);
  if(!saveJSON(STORAGE.logs,next))return;
  healthLogs=next;cancelLogEdit();renderLogs();renderSparkline();
}
function defaultKitchen() {
  const today=new Date();
  const untilMonday=(8-today.getDay())%7 || 7;
  return {days:[1,2,3,4,5,6,7],people:1,start:addDateDays(localDateKey(),untilMonday),inventory:[],checked:{}};
}
function validateKitchen(data) {
  if(!data || !Array.isArray(data.days) || data.days.some(d=>!PlanCore.integer(d,1,10)) || new Set(data.days).size!==data.days.length ||
    !PlanCore.integer(data.people,1,20) || !PlanCore.validDate(data.start) || !data.checked || typeof data.checked!=='object' || Array.isArray(data.checked)) throw new Error('kitchen');
  const inventory=PlanCore.validateInventory(data.inventory);
  if(inventory.some(item=>item.component!=='custom' && !INGREDIENTS[item.component]?.[3]))throw new Error('component');
  const checked={};for(const [key,value] of Object.entries(data.checked)){if(!/^(saturday|sunday|shop-[a-zA-Z]+)$/.test(key)||typeof value!=='boolean')throw new Error('checked');checked[key]=value;}
  return {days:data.days.slice().sort((a,b)=>a-b),people:data.people,start:data.start,inventory,checked};
}
let kitchen;
try {kitchen=validateKitchen(readJSON(STORAGE.kitchen,null));} catch{kitchen=defaultKitchen();}
let activeKitchenView='prep';
let editingBatch=null;
let undoInventory=null;
function persistKitchen(next) {
  if(!saveJSON(STORAGE.kitchen,next))return false;
  kitchen=next;renderKitchen();return true;
}
function kitchenView(view) {if(!['prep','shopping','freezer'].includes(view))return;activeKitchenView=view;renderKitchen();}
function savePlanning() {
  const start=document.getElementById('weekStart').value;
  const people=Number(document.getElementById('people').value);
  if(!PlanCore.validDate(start)||!PlanCore.integer(people,1,20)){showToast(ui('planningInvalid'));return;}
  persistKitchen({...kitchen,start,people,checked:{}});
}
function togglePrepDay(day) {
  const days=kitchen.days.includes(day)?kitchen.days.filter(d=>d!==day):[...kitchen.days,day].sort((a,b)=>a-b);
  persistKitchen({...kitchen,days,checked:{}});
}
function totalsAndCoverage() {
  const totals=PlanCore.demand(kitchen.days,kitchen.people,mealParts);
  return {totals,coverage:PlanCore.coverage(totals,kitchen.inventory)};
}
function toggleKitchenCheck(key) {
  persistKitchen({...kitchen,checked:{...kitchen.checked,[key]:!kitchen.checked[key]}});
}
function checklist(key,text) {
  return `<label><input type="checkbox" ${kitchen.checked[key]?'checked':''} onchange="toggleKitchenCheck('${key}')"><span>${escapeHTML(text)}</span></label>`;
}
function renderKitchen() {
  applyExtraLanguage();
  document.getElementById('weekStart').value=kitchen.start;
  document.getElementById('people').value=kitchen.people;
  document.getElementById('prepDays').innerHTML=Array.from({length:10},(_,i)=>i+1).map(d=>`<button type="button" aria-pressed="${kitchen.days.includes(d)}" onclick="togglePrepDay(${d})">${escapeHTML(t('day'))} ${d}</button>`).join('');
  document.querySelectorAll('[data-view]').forEach(btn=>btn.setAttribute('aria-pressed',String(btn.dataset.view===activeKitchenView)));
  const content=document.getElementById('kitchenContent');
  if(activeKitchenView==='freezer'){content.innerHTML=renderFreezer();return;}
  if(!kitchen.days.length){content.innerHTML=`<p class="empty-state">${ui('none')}</p>`;return;}
  const {totals,coverage}=totalsAndCoverage();
  content.innerHTML=activeKitchenView==='shopping'?renderShopping(totals,coverage):renderPrep(totals,coverage);
}
function renderPrep(totals,coverage) {
  const freeze=Object.keys(totals).filter(id=>INGREDIENTS[id][3]);
  const fresh=Object.keys(totals).filter(id=>!INGREDIENTS[id][3]);
  const tasks=freeze.map(id=>{
    const c=coverage[id];
    return `<div class="prep-row"><strong>${escapeHTML(ingredient(id))}</strong><p class="prep-meta">${ui('needed')}: ${c.needed} · ${ui('inStock')}: ${c.available} · ${ui('prepare')}: ${c.remaining}</p>${c.remaining?`<button type="button" class="prep-action" onclick="openBatch(null,'${id}',${c.remaining})">${ui('freezeNow')}</button>`:`<span class="stock-badge">${ui('fullCoverage')}</span>`}</div>`;
  }).join('');
  const schedule=buildSchedule(coverage);
  const first=new Date(kitchen.start+'T12:00:00');
  const sunday=addDateDays(kitchen.start,-(first.getDay()||7));
  const saturday=addDateDays(sunday,-1);
  return `<p class="prep-meta">${ui('portionHelp')}</p><div class="card"><h2>${ui('saturday')} · ${escapeHTML(prettyDate(saturday))}</h2>${checklist('saturday',ui('saturdayTask'))}</div><div class="card"><h2>${ui('sunday')} · ${escapeHTML(prettyDate(sunday))}</h2><p>${ui('sundayTask')}</p>${tasks}</div><div class="card"><h2>${ui('fresh')}</h2><p>${ui('freshHelp')}</p><p class="prep-meta">${fresh.map(ingredient).map(escapeHTML).join(' · ')}</p></div><div class="card"><h2>${ui('schedule')}</h2>${schedule}</div>${safetyCard()}`;
}
function addDateDays(date,n) {const d=new Date(date+'T12:00:00');d.setDate(d.getDate()+n);return localDateKey(d);}
function prettyDate(date) {return new Intl.DateTimeFormat({es:'es',en:'en',no:'nb'}[lang],{weekday:'short',month:'short',day:'numeric'}).format(new Date(date+'T12:00:00'));}
function buildSchedule(coverage) {
  const stocks={};for(const [id,c] of Object.entries(coverage))stocks[id]=c.batches.map(b=>({...b}));
  return kitchen.days.map((day,index)=>{
    const date=addDateDays(kitchen.start,index);
    const used=[];
    for(const type of ['b','l','d']) for(const id of mealParts(day,type).filter(id=>INGREDIENTS[id][3])) {
      let need=kitchen.people;
      for(const batch of stocks[id]||[]) {
        const take=Math.min(need,batch.portions);if(!take)continue;
        const item=kitchen.inventory.find(item=>item.id===batch.id);
        used.push(`${ingredient(id)} × ${take} (${item.location || item.frozen})`);
        batch.portions-=take;need-=take;if(!need)break;
      }
      if(need)used.push(`${ingredient(id)} × ${need} — ${ui('prepare')}`);
    }
    return `<div class="prep-row"><h3>${escapeHTML(prettyDate(date))} · ${t('day')} ${day}</h3>${used.length?`<p class="prep-meta">${ui('thaw')} (${escapeHTML(prettyDate(addDateDays(date,-1)))}):</p><p>${used.map(escapeHTML).join(' · ')}</p>`:''}<p class="prep-meta">${['b','l','d'].map(type=>escapeHTML(mealText(day,type))).join('<br>')}</p><button type="button" class="prep-action" onclick="openPlanDay(${day})">${ui('original')} ${day}</button></div>`;
  }).join('');
}
function openPlanDay(day){goToDay(day);switchTab('plan',document.getElementById('nav-plan'));window.scrollTo({top:0,behavior:'smooth'});}
function safetyCard(){return `<details class="card"><summary>${ui('safetySource')}</summary><p>${ui('safety')}</p><p>${ui('qualityInfo')}</p><a href="https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/leftovers-and-food-safety" target="_blank" rel="noopener">USDA</a></details>`;}
function renderShopping(totals,coverage) {
  return `<div class="card"><h2>${ui('shopping')}</h2><p>${ui('shoppingHelp')}</p><p class="prep-meta">${ui('portionHelp')}</p>${Object.keys(totals).sort((a,b)=>ingredient(a).localeCompare(ingredient(b))).map(id=>{
    const remaining=coverage[id].remaining;
    return `<div class="prep-row ${kitchen.checked['shop-'+id]?'checked':''}">${checklist('shop-'+id,ingredient(id)+' × '+remaining)}${coverage[id].available?`<span class="stock-badge">${ui('inStock')}: ${coverage[id].available}</span>`:''}</div>`;
  }).join('')}<button class="prep-action" type="button" onclick="exportShopping()">${ui('exportShopping')}</button></div>`;
}
function renderFreezer() {
  const rows=kitchen.inventory.slice().sort((a,b)=>(a.bestBefore||'9999').localeCompare(b.bestBefore||'9999')||a.frozen.localeCompare(b.frozen));
  return `<div class="actions"><button type="button" onclick="openBatch()">＋ ${ui('addBatch')}</button>${undoInventory?`<button type="button" onclick="undoStock()">${ui('undo')}</button>`:''}</div><p class="prep-meta">${ui('stockHelp')}</p>${rows.length?rows.map(item=>`<div class="card"><h2>${escapeHTML(item.component==='custom'?item.name:ingredient(item.component))}</h2><p>${ui('remaining')}: <strong>${item.portions}</strong></p><p class="prep-meta">${ui('frozen')}: ${escapeHTML(item.frozen)}${item.location?' · '+escapeHTML(item.location):''}</p>${item.bestBefore?`<p class="stock-badge ${item.bestBefore<=localDateKey()?'quality-due':''}">${ui('bestBefore')}: ${escapeHTML(item.bestBefore)}${item.bestBefore<=localDateKey()?' · '+ui('useSoon'):''}</p>`:''}${item.note?`<p>${escapeHTML(item.note)}</p>`:''}<div class="actions"><button type="button" ${item.portions?'':'disabled'} onclick="useBatch('${item.id}')">${ui('useOne')}</button><button type="button" onclick="openBatch('${item.id}')">${ui('edit')}</button><button type="button" onclick="deleteBatch('${item.id}')">${ui('delete')}</button></div></div>`).join(''):`<p class="empty-state">${ui('emptyFreezer')}</p>`}${safetyCard()}`;
}
function openBatch(id=null,component='chicken',portions=1) {
  editingBatch=id;
  const item=id?kitchen.inventory.find(i=>i.id===id):null;if(id&&!item)return;
  document.getElementById('freezerTitle').textContent=ui(item?'batchEdit':'addBatch');
  document.getElementById('batchComponent').innerHTML=Object.keys(INGREDIENTS).filter(id=>INGREDIENTS[id][3]).map(id=>`<option value="${id}">${escapeHTML(ingredient(id))}</option>`).join('')+`<option value="custom">${ui('custom')}</option>`;
  document.getElementById('batchComponent').value=item?.component||component;
  document.getElementById('batchName').value=item?.name||'';
  document.getElementById('batchPortions').value=item?.portions||portions;
  document.getElementById('batchPortions').min=item?'0':'1';
  document.getElementById('batchFrozen').value=item?.frozen||localDateKey();
  document.getElementById('batchBestBefore').value=item?.bestBefore||'';
  document.getElementById('batchLocation').value=item?.location||'';
  document.getElementById('batchNote').value=item?.note||'';
  document.getElementById('batchError').textContent='';toggleCustomName();
  document.getElementById('freezerDialog').showModal();
}
function toggleCustomName(){const custom=document.getElementById('batchComponent').value==='custom';document.getElementById('customNameWrap').hidden=!custom;document.getElementById('batchName').required=custom;}
function saveBatch(event) {
  event.preventDefault();
  const component=document.getElementById('batchComponent').value;
  const name=document.getElementById('batchName').value.trim();
  const portions=Number(document.getElementById('batchPortions').value);
  const frozen=document.getElementById('batchFrozen').value;
  const bestBefore=document.getElementById('batchBestBefore').value;
  if((component!=='custom'&&!INGREDIENTS[component]?.[3])||(component==='custom'&&!name)||!PlanCore.integer(portions,editingBatch?0:1,9999)||!PlanCore.validDate(frozen)||frozen>localDateKey()||(bestBefore&&(!PlanCore.validDate(bestBefore)||bestBefore<frozen))){document.getElementById('batchError').textContent=ui('batchInvalid');return;}
  const item={id:editingBatch||crypto.randomUUID(),component,name,portions,frozen,bestBefore,location:document.getElementById('batchLocation').value.trim(),note:document.getElementById('batchNote').value.trim()};
  const inventory=editingBatch?kitchen.inventory.map(i=>i.id===editingBatch?item:i):[...kitchen.inventory,item];
  const previous=kitchen.inventory;
  if(!persistKitchen({...kitchen,inventory}))return;
  undoInventory=previous;document.getElementById('freezerDialog').close();renderKitchen();showToast(t('toastSaved'));
}
function useBatch(id) {
  const item=kitchen.inventory.find(i=>i.id===id);if(!item||!item.portions)return;
  const previous=kitchen.inventory;
  if(persistKitchen({...kitchen,inventory:kitchen.inventory.map(i=>i.id===id?{...i,portions:i.portions-1}:i)})){undoInventory=previous;renderKitchen();}
}
function deleteBatch(id) {if(!confirm(ui('confirmDelete')))return;const previous=kitchen.inventory;if(persistKitchen({...kitchen,inventory:kitchen.inventory.filter(i=>i.id!==id)})){undoInventory=previous;renderKitchen();}}
function undoStock(){if(!undoInventory)return;if(persistKitchen({...kitchen,inventory:undoInventory})){undoInventory=null;renderKitchen();}}
function download(name,content,type) {const url=URL.createObjectURL(new Blob([content],{type}));const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
function exportShopping(){const {totals,coverage}=totalsAndCoverage();const text=[ui('shopping'),kitchen.start,ui('portionHelp'),...Object.keys(totals).map(id=>`${kitchen.checked['shop-'+id]?'[x]':'[ ]'} ${ingredient(id)} × ${coverage[id].remaining}`)].join('\n');download('plan-mafer-shopping.txt',text,'text/plain;charset=utf-8');}
function exportHealthCSV() {
  const cell=value=>'"'+String(value??'').replace(/"/g,'""').replace(/^[=+@-]/,"'$&")+'"';
  const lines=[['timestamp','glucose_mg_dL','symptoms','notes'],...healthLogs.map(l=>[l.timestamp||l.date,l.gluc,l.symp,l.note])];
  download('plan-mafer-health.csv','\uFEFF'+lines.map(row=>row.map(cell).join(',')).join('\r\n'),'text/csv;charset=utf-8');
}
function exportBackup() {
  const data={lang,activeDay,mealChecks,waterData,healthLogs,swapOverrides,kitchen,glucoseUnit};
  download('plan-mafer-backup-'+localDateKey()+'.json',JSON.stringify({app:'plan-mafer',version:1,exportedAt:new Date().toISOString(),data},null,2),'application/json');
}
function validateBackup(raw) {
  if(raw?.app!=='plan-mafer'||raw.version!==1||!raw.data)throw new Error('backup');
  const d=raw.data;
  if(!T[d.lang]||!PlanCore.integer(d.activeDay,1,10)||!['mg/dL','mmol/L'].includes(d.glucoseUnit)||!d.waterData||!PlanCore.integer(d.waterData.count,0,8)||!PlanCore.validDate(d.waterData.date))throw new Error('backup');
  for(const [key,map] of [['checks',d.mealChecks],['swaps',d.swapOverrides]]){
    if(!map||typeof map!=='object'||Array.isArray(map))throw new Error('backup');
    for(const [id,value] of Object.entries(map)){
      if(!/^d(?:10|[1-9])_(?:b|sa|l|sp|d)$/.test(id))throw new Error('backup');
      if(key==='checks'&&typeof value!=='boolean')throw new Error('backup');
      if(key==='swaps'&&(!PlanCore.integer(value,0,(SWAPS[id.split('_')[1]]?.es.length||0)-1)))throw new Error('backup');
    }
  }
  if(!Array.isArray(d.healthLogs)||d.healthLogs.length>100000)throw new Error('backup');
  const logs=d.healthLogs.map(l=>{
    if(!l||typeof l.symp!=='string'||typeof l.note!=='string'||typeof l.date!=='string'||typeof l.timestamp!=='string'||(l.timestamp&&!Number.isFinite(Date.parse(l.timestamp))))throw new Error('backup');
    // Preserve legacy readings as exported, including previously accepted out-of-range values.
    if(typeof l.gluc!=='string'||l.gluc.length>100)throw new Error('backup');
    return {...l};
  });
  return {...d,healthLogs:PlanCore.mergeLogs(logs,[]),kitchen:validateKitchen(d.kitchen)};
}
function storeTransaction(values) {
  try {
    // Commit the full snapshot in one atomic localStorage write. Legacy keys stay intact.
    const snapshot={};
    for(const key of Object.values(STORAGE))if(key!==STORAGE.state)snapshot[key]=readStorage(key);
    for(const [key,value] of Object.entries(values))snapshot[key]=typeof value==='string'?value:JSON.stringify(value);
    localStorage.setItem(STORAGE.state,JSON.stringify(snapshot));
    return true;
  }catch{
    showToast(ui('saveFailed'));return false;
  }
}
async function restoreBackup(input) {
  const file=input.files[0];if(!file)return;
  try {
    if(file.size>25*1024*1024)throw new Error('size');
    const data=validateBackup(JSON.parse(await file.text()));
    if(!confirm(ui('confirmRestore')))return;
    const values={[STORAGE.lang]:data.lang,[STORAGE.activeDay]:String(data.activeDay),[STORAGE.checks]:data.mealChecks,[STORAGE.water]:data.waterData,[STORAGE.logs]:data.healthLogs,[STORAGE.swaps]:data.swapOverrides,[STORAGE.kitchen]:data.kitchen,[STORAGE.unit]:data.glucoseUnit};
    if(!storeTransaction(values))return;
    lang=data.lang;activeDay=data.activeDay;mealChecks=data.mealChecks;waterData=data.waterData;healthLogs=data.healthLogs;swapOverrides=data.swapOverrides;kitchen=data.kitchen;glucoseUnit=data.glucoseUnit;
    undoInventory=null;cancelLogEdit();setLang(lang);init();document.getElementById('backupStatus').textContent=ui('restored');
  }catch{document.getElementById('backupStatus').textContent=ui('invalidBackup');}
  finally{input.value='';}
}
