const HLANG=document.documentElement.lang||'fr';
const HTXT={
 fr:{all:'Tous',tank:'Tank',aircraft:'Avion',missile:'Missile',defense:'Défense',attack:'Attaque',support:'Soutien',hero:'Héros',type:'Type',role:'Rôle',rarity:'Rareté',tier:'Repère méta',alias:'Alias'},
 en:{all:'All',tank:'Tank',aircraft:'Aircraft',missile:'Missile',defense:'Defense',attack:'Attack',support:'Support',hero:'Hero',type:'Type',role:'Role',rarity:'Rarity',tier:'Meta marker',alias:'Alias'},
 it:{all:'Tutti',tank:'Tank',aircraft:'Aircraft',missile:'Missile',defense:'Difesa',attack:'Attacco',support:'Supporto',hero:'Eroe',type:'Tipo',role:'Ruolo',rarity:'Rarità',tier:'Riferimento meta',alias:'Alias'},
 es:{all:'Todos',tank:'Tank',aircraft:'Aircraft',missile:'Missile',defense:'Defensa',attack:'Ataque',support:'Apoyo',hero:'Héroe',type:'Tipo',role:'Rol',rarity:'Rareza',tier:'Referencia meta',alias:'Alias'}
}[HLANG];
const typeIcon={tank:'🛡️',aircraft:'✈️',missile:'🎯'}, roleIcon={defense:'🧱',attack:'⚔️',support:'✨'};
fetch('../data/heroes.json').then(r=>r.json()).then(heroes=>{
 const tbody=document.querySelector('#heroTable tbody'), tf=document.getElementById('heroTypeFilter'), rf=document.getElementById('heroRoleFilter');
 function draw(){const t=tf.value,r=rf.value;tbody.innerHTML='';heroes.filter(h=>(t==='all'||h.type===t)&&(r==='all'||h.role===r)).forEach(h=>{const tr=document.createElement('tr');tr.innerHTML=`<td><b>${h.name}</b>${h.aliases&&h.aliases.length?`<br><small>${HTXT.alias}: ${h.aliases.join(', ')}</small>`:''}</td><td>${typeIcon[h.type]} ${HTXT[h.type]}</td><td>${roleIcon[h.role]} ${HTXT[h.role]}</td><td>${h.rarity}</td><td>${h.fallbackTier||'—'}</td>`;tbody.appendChild(tr)})}
 tf.addEventListener('change',draw);rf.addEventListener('change',draw);draw();document.getElementById('heroCount').textContent=heroes.length;
});
