// ═══ STATE ═══
let discSector = 'all';
let discCat = 'all';
let discVisible = 10;

// ═══ RENDER ═══
function renderPills(){
  document.getElementById('pills').innerHTML=sectors.filter(s=>s.id!=='all').map(s=>`<div class="pill" onclick="go('discover','${s.id}')">${s.icon} <span class="fr">${s.fr}</span><span class="en">${s.en}</span></div>`).join('');
}

function renderTools(){
  document.getElementById('tg').innerHTML=tools.map(t=>`<div class="tc"><div class="tci">${t.i}</div><div class="tcn"><span class="fr">${t.f}</span><span class="en">${t.e}</span></div><div class="tcd"><span class="fr">${t.df}</span><span class="en">${t.de}</span></div></div>`).join('');
}

function renderDiscover(){
  // Sidebar
  let sb='<div class="disc-sb-title"><span class="fr">Secteur</span><span class="en">Industry</span></div>';
  sectors.forEach(s=>{sb+=`<div class="disc-tag ${discSector===s.id?'act':''}" onclick="setDiscFilter('${s.id}',null)">${s.icon?s.icon+' ':''}<span class="fr">${s.fr}</span><span class="en">${s.en}</span></div>`});
  sb+='<div class="disc-sb-title"><span class="fr">Type</span><span class="en">Use Case</span></div>';
  ucTypes.forEach(u=>{sb+=`<div class="disc-tag ${discCat===u.id?'act':''}" onclick="setDiscFilter(null,'${u.id}')"><span class="fr">${u.fr}</span><span class="en">${u.en}</span></div>`});
  document.getElementById('discSidebar').innerHTML=sb;

  // Filter agents
  let filtered=agents;
  if(discSector!=='all')filtered=filtered.filter(a=>a.sector===discSector);
  if(discCat!=='all')filtered=filtered.filter(a=>a.cat===discCat);

  document.getElementById('discCount').innerHTML=`<span class="fr">${filtered.length} agents</span><span class="en">${filtered.length} agents</span>`;

  const visible=filtered.slice(0,discVisible);
  document.getElementById('discGrid').innerHTML=visible.map(a=>`<div class="ag"><div class="ag-top"><div class="ag-name"><span class="fr">${a.n.fr}</span><span class="en">${a.n.en}</span></div><span class="ag-sector" style="background:${a.c};color:${a.tc}"><span class="fr">${a.cf}</span><span class="en">${a.ce}</span></span></div><div class="ag-desc"><span class="fr">${a.d.fr}</span><span class="en">${a.d.en}</span></div><div class="ag-foot"><span class="ag-mi">${a.m}</span><span class="ag-badge">${a.icon} <span class="fr">${a.sf}</span><span class="en">${a.se}</span></span><span class="ag-by"><span class="ag-by-dot">G</span> by Granit</span></div></div>`).join('');

  document.getElementById('loadMore').style.display=discVisible<filtered.length?'block':'none';
  applyLang();
}

function setDiscFilter(sector,cat){
  if(sector!==null)discSector=sector;
  if(cat!==null)discCat=cat;
  discVisible=10;
  renderDiscover();
}

function loadMoreAgents(){discVisible+=10;renderDiscover()}

// ═══ NAV ═══
function go(page,param){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById('page-'+page).classList.add('active');
  document.querySelectorAll('.na').forEach(a=>a.classList.remove('act'));
  const navPage=document.querySelector(`.na[data-page="${page}"]`);
  if(navPage)navPage.classList.add('act');
  window.scrollTo(0,0);
  if(page==='discover'){if(param)discSector=param;else{discSector='all';discCat='all'}discVisible=10;renderDiscover()}
  applyLang();
}

async function submitDemo(e){
  e.preventDefault();
  const form=document.getElementById('demoForm');
  const btn=form.querySelector('.form-submit');
  btn.disabled=true;
  const data=Object.fromEntries(new FormData(form));
  try{
    const res=await fetch('/api/demo',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
    if(!res.ok)throw new Error('server');
    form.style.display='none';
    document.getElementById('formSuccess').style.display='block';
  }catch{
    btn.disabled=false;
    alert('Une erreur est survenue. Veuillez réessayer.');
  }
}

function toggleLang(){
  const h=document.documentElement;
  h.dataset.lang=h.dataset.lang==='en'?'fr':'en';
  document.querySelector('.nlang').textContent=h.dataset.lang==='en'?'FR':'EN';
  applyLang();
}
function applyLang(){
  const l=document.documentElement.dataset.lang||'fr';
  document.querySelectorAll('.fr').forEach(e=>e.style.display=l==='fr'?'':'none');
  document.querySelectorAll('.en').forEach(e=>e.style.display=l==='en'?'':'none');
}

renderPills();renderTools();applyLang();
