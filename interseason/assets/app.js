
const menu=document.querySelector('.menu'), drawer=document.querySelector('.drawer');
if(menu&&drawer){
  const closeDrawer=()=>{drawer.classList.remove('open');menu.setAttribute('aria-expanded','false')};
  const toggleDrawer=()=>{const open=!drawer.classList.contains('open');drawer.classList.toggle('open',open);menu.setAttribute('aria-expanded',open?'true':'false')};
  menu.onclick=toggleDrawer;
  document.addEventListener('click',e=>{if(drawer.classList.contains('open')&&!drawer.contains(e.target)&&!menu.contains(e.target))closeDrawer()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&drawer.classList.contains('open')){closeDrawer();menu.focus()}});
  drawer.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeDrawer));
}
const lb=document.querySelector('.lightbox');if(lb){document.querySelectorAll('[data-lightbox]').forEach(x=>x.onclick=e=>{e.preventDefault();lb.querySelector('img').src=x.href;lb.classList.add('open')});lb.querySelector('button').onclick=()=>lb.classList.remove('open');lb.onclick=e=>{if(e.target===lb)lb.classList.remove('open')}}
document.querySelectorAll('[data-lang]').forEach(a=>a.onclick=()=>localStorage.setItem('wfgg_lang',a.dataset.lang));

function wfggSaveLang(lang){try{localStorage.setItem('wfgg_lang',lang)}catch(e){}}
document.querySelectorAll('[data-lang]').forEach(a=>a.addEventListener('click',()=>wfggSaveLang(a.dataset.lang)));
