const $=s=>document.querySelector(s);
function show(id){document.querySelectorAll('.stage').forEach(e=>e.classList.remove('on'));$('#'+id).classList.add('on');window.scrollTo(0,0)}

/* floating flowers */
const F=['🌸','🌷','🌹','🌼','🌺','💐','🌻','🪷'];let flTimer=null;
function spawn(){const f=document.createElement('span');f.className='fl';f.textContent=F[Math.random()*F.length|0];f.style.left=Math.random()*96+'vw';f.style.fontSize=(18+Math.random()*28)+'px';f.style.animationDuration=(6+Math.random()*6)+'s';$('#fl').appendChild(f);setTimeout(()=>f.remove(),13000)}
function startFlowers(){if(flTimer)return;for(let i=0;i<10;i++)setTimeout(spawn,i*150);flTimer=setInterval(spawn,500)}

/* lock */
function tryUnlock(){
  const v=$('#pw').value.toLowerCase().replace(/[^a-z0-9]/g,'');
  if(['18feb','18february','1802','feb18','february18'].includes(v)){show('msg');startFlowers()}
  else{$('#err').textContent='Not quite… think of a special date 💭';const c=$('#lock .card');c.classList.remove('shake');void c.offsetWidth;c.classList.add('shake')}
}
$('#go').onclick=tryUnlock;
$('#pw').addEventListener('keydown',e=>{if(e.key==='Enter')tryUnlock()});
$('#toDuas').onclick=()=>show('main');
$('#tD').onclick=()=>{$('#duas').style.display='';$('#games').style.display='none';$('#tD').className='';$('#tG').className='alt'};
$('#tG').onclick=()=>{$('#duas').style.display='none';$('#games').style.display='';$('#tG').className='';$('#tD').className='alt'};

/* memory game */
let first=null,lock=false,moves=0,found=0;
function build(){
  const E=['🌸','🌷','🌹','🌻','🍓','🦋','🌙','⭐'];const a=[...E,...E].sort(()=>Math.random()-.5);
  const g=$('#grid');g.innerHTML='';moves=0;found=0;first=null;lock=false;$('#mv').textContent=0;$('#win').textContent='';
  a.forEach(e=>{const t=document.createElement('div');t.className='tile';t.dataset.e=e;t.textContent='❔';t.onclick=()=>flip(t);g.appendChild(t)});
}
function flip(t){
  if(lock||t.classList.contains('open')||t.classList.contains('done'))return;
  t.classList.add('open');t.textContent=t.dataset.e;
  if(!first){first=t;return}
  moves++;$('#mv').textContent=moves;
  if(first.dataset.e===t.dataset.e){first.classList.replace('open','done');t.classList.replace('open','done');first=null;if(++found===8)$('#win').textContent='You did it in '+moves+' moves! 🎉'}
  else{lock=true;const a=first;first=null;setTimeout(()=>{[a,t].forEach(x=>{x.classList.remove('open');x.textContent='❔'});lock=false},700)}
}
$('#reset').onclick=build;build();

/* catch game */
let score=0,left=20,tickT=null,spT=null;
$('#start').onclick=()=>{
  clearInterval(tickT);clearInterval(spT);$('#box').innerHTML='';score=0;left=20;$('#sc').textContent=0;$('#tm').textContent=20;
  spT=setInterval(()=>{const b=$('#box'),t=document.createElement('span');t.className='t';t.textContent=F[Math.random()*F.length|0];
    t.style.left=Math.random()*(b.clientWidth-44)+'px';t.style.top=Math.random()*(b.clientHeight-44)+'px';
    const hit=()=>{score++;$('#sc').textContent=score;t.remove()};t.onclick=hit;t.ontouchstart=e=>{e.preventDefault();hit()};
    b.appendChild(t);setTimeout(()=>t.remove(),1300)},550);
  tickT=setInterval(()=>{left--;$('#tm').textContent=left;if(left<=0){clearInterval(tickT);clearInterval(spT);$('#box').innerHTML='<p style="padding-top:90px">Time’s up! You caught '+score+' flowers 🌸</p>'}},1000);
};