
const menu=document.querySelector('.menu'), drawer=document.querySelector('.drawer');
if(menu&&drawer){menu.onclick=()=>drawer.classList.toggle('open');document.addEventListener('click',e=>{if(drawer.classList.contains('open')&&!drawer.contains(e.target)&&!menu.contains(e.target))drawer.classList.remove('open')})}
const lb=document.querySelector('.lightbox');if(lb){document.querySelectorAll('[data-lightbox]').forEach(x=>x.onclick=e=>{e.preventDefault();lb.querySelector('img').src=x.href;lb.classList.add('open')});lb.querySelector('button').onclick=()=>lb.classList.remove('open');lb.onclick=e=>{if(e.target===lb)lb.classList.remove('open')}}
document.querySelectorAll('[data-lang]').forEach(a=>a.onclick=()=>localStorage.setItem('wfgg_lang',a.dataset.lang));
