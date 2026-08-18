const LANG=document.documentElement.lang||'fr';
const labels={
 fr:{all:'Tous',locked:'Verrouillé',review:'À verrouiller',cats:{boss_zombies:'Boss & Zombies',wanted_codes:'Codes 39 · 64 · 87',capitol_warzone:'Capitole & Zone de Guerre',battlefields_pvp:'Champs de bataille & PvP',alliance_recurring:'Alliance & récurrents',markets_temporary:'Marchés & temporaires',interseason:'Inter-Saison'}},
 en:{all:'All',locked:'Locked',review:'To verify',cats:{boss_zombies:'Bosses & Zombies',wanted_codes:'Codes 39 · 64 · 87',capitol_warzone:'Capitol & Warzone',battlefields_pvp:'Battlefields & PvP',alliance_recurring:'Alliance & recurring',markets_temporary:'Markets & temporary',interseason:'Off-Season'}},
 it:{all:'Tutti',locked:'Confermato',review:'Da verificare',cats:{boss_zombies:'Boss & Zombie',wanted_codes:'Codici 39 · 64 · 87',capitol_warzone:'Campidoglio & Zona di Guerra',battlefields_pvp:'Campi di battaglia & PvP',alliance_recurring:'Alleanza & ricorrenti',markets_temporary:'Mercati & temporanei',interseason:'Inter-Stagione'}},
 es:{all:'Todos',locked:'Confirmado',review:'Por verificar',cats:{boss_zombies:'Jefes y Zombis',wanted_codes:'Códigos 39 · 64 · 87',capitol_warzone:'Capitolio y Zona de Guerra',battlefields_pvp:'Campos de batalla y PvP',alliance_recurring:'Alianza y recurrentes',markets_temporary:'Mercados y temporales',interseason:'Intertemporada'}}
}[LANG];
fetch('../data/events.json').then(r=>r.json()).then(events=>{
 const tbody=document.querySelector('#eventTable tbody');
 const status=document.getElementById('statusFilter');
 const category=document.getElementById('categoryFilter');
 const query=document.getElementById('eventSearch');
 const visibleCount=document.getElementById('visibleEventCount');
 const cats=[...new Set(events.map(e=>e.category))].filter(c=>labels.cats[c]);
 if(category){
   cats.forEach(c=>{const o=document.createElement('option');o.value=c;o.textContent=labels.cats[c];category.appendChild(o)});
   const hash=location.hash.slice(1);
   if(cats.includes(hash)) category.value=hash;
 }
 function draw(){
   const sf=status?status.value:'all', cf=category?category.value:'all', q=(query?.value||'').trim().toLowerCase();
   tbody.innerHTML='';
   const filtered=events.filter(e=>{
     const text=[e.id,e.kind,...Object.values(e.names||{}),...Object.values(e.aliases||{}).flat()].join(' ').toLowerCase();
     return (sf==='all'||Object.values(e.status).includes(sf))&&(cf==='all'||e.category===cf)&&(!q||text.includes(q));
   });
   filtered.forEach(e=>{
     const tr=document.createElement('tr');
     const cell=(lang)=>`<b>${e.names[lang]}</b><br><span class="status ${e.status[lang]}">${e.status[lang]==='locked'?labels.locked:labels.review}</span>`;
     const detail=e.detailPages&&e.detailPages[LANG]?`<br><a class="detail-link" href="${e.detailPages[LANG]}">↗ ${LANG==='fr'?'Ouvrir la fiche':LANG==='it'?'Apri scheda':LANG==='es'?'Abrir ficha':'Open guide'}</a>`:'';
     tr.innerHTML=`<td><code>${e.id}</code><br><small>${e.kind}</small>${detail}</td><td>${cell('fr')}</td><td>${cell('en')}</td><td>${cell('it')}</td><td>${cell('es')}</td>`;
     tbody.appendChild(tr)
   });
   if(visibleCount) visibleCount.textContent=filtered.length;
 }
 if(status) status.addEventListener('change',draw);
 if(query) query.addEventListener('input',draw);
 if(category) category.addEventListener('change',()=>{
   if(category.value==='all') history.replaceState(null,'',location.pathname);
   else history.replaceState(null,'','#'+category.value);
   draw();
 });
 window.addEventListener('hashchange',()=>{if(category){const h=location.hash.slice(1);category.value=cats.includes(h)?h:'all'};draw()});
 draw();
 document.getElementById('eventCount').textContent=events.length;
 document.getElementById('lockedCount').textContent=events.filter(e=>Object.values(e.status).every(x=>x==='locked')).length;
});
