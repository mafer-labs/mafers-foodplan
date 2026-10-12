healthLogs=PlanCore.mergeLogs(healthLogs,[]);
swapOverrides=Object.fromEntries(Object.entries(swapOverrides).map(([key,value])=>[key,Number(value)]));
document.getElementById('swapPanel').addEventListener('cancel',event=>{event.preventDefault();closeSwap();});
document.addEventListener('visibilitychange',()=>{if(!document.hidden){checkWaterReset();renderWater();}});
window.addEventListener('focus',()=>{checkWaterReset();renderWater();});
init();
