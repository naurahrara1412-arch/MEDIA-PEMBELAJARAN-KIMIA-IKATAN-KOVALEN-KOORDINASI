const sectionIds=['beranda','peta','konsep','konsep-lanjutan','audio-visual','simulasi','contoh','latihan','ringkasan'];
const stageNarrations=[
'Tahap satu. Nitrogen memiliki konfigurasi kulit K dua dan L lima, sehingga ada lima elektron valensi.',
'Tahap dua. Pada amonia, NH tiga, nitrogen terikat dengan tiga atom hidrogen dan masih memiliki satu pasangan elektron bebas.',
'Tahap tiga. Pasangan elektron bebas berada pada nitrogen. Pasangan ini dapat didonasikan kepada ion hidrogen, H plus.',
'Tahap empat. Ion H plus bergerak mendekati nitrogen. Pasangan elektron dari nitrogen bergerak menuju H plus untuk digunakan bersama.',
'Tahap lima. Pasangan elektron membentuk ikatan N H yang baru. Panah dimulai dari nitrogen karena nitrogen adalah donor pasangan elektron.',
'Tahap enam. Terbentuk ion amonium, NH empat plus. Ikatan kovalen koordinasi menjelaskan bahwa pasangan elektron pembentuk ikatan tersebut semula berasal dari satu atom donor.'
];
const stages=[
 ['Konfigurasi kulit N','Nitrogen memiliki 2 elektron pada kulit K dan 5 elektron pada kulit L. Elektron valensi nitrogen berjumlah 5.'],
 ['Molekul NH₃','Nitrogen berikatan dengan tiga atom H. Satu pasangan elektron bebas masih berada pada N.'],
 ['Pasangan elektron bebas','Pasangan elektron bebas berada tepat di atas dan di tengah simbol N. Pasangan tersebut berasal dari nitrogen.'],
 ['H⁺ mendekat','Ion H⁺ bergerak mendekati nitrogen. Pasangan elektron bebas tetap tepat di atas tengah atom N.'],
 ['Pasangan elektron bergerak','Pasangan elektron bergerak dari N menuju H⁺ dan digunakan bersama untuk membentuk ikatan. Visual pasangan bebas tetap berawal tepat di atas tengah N.'],
 ['Ion NH₄⁺ terbentuk','Hasil akhirnya adalah NH₄⁺. Panah koordinasi menunjukkan asal pasangan elektron, bukan gerak atom secara keseluruhan.']
];
let stage=0;
function sceneMarkup(i){
 const chip=`<div class="sim-chip">Tahap ${i+1}/6</div>`;
 if(i===0)return chip+`<div class="shell-model"><div class="nucleus">N</div><div class="orbit orbit-k"><span class="electron e1"></span><span class="electron e2"></span></div><div class="orbit orbit-l"><span class="electron e3"></span><span class="electron e4"></span><span class="electron e5"></span><span class="electron e6"></span><span class="electron e7"></span></div><div class="shell-caption">Kulit K = 2 • Kulit L = 5</div></div>`;
 if(i===1)return chip+`<div class="atom-diagram"><span class="h h-left">H</span><span class="bond b-left"></span><span class="n-center">N</span><span class="bond b-right"></span><span class="h h-right">H</span><span class="h h-bottom">H</span><span class="bond b-bottom"></span><span class="free-pair">••</span><small>NH₃ • pasangan elektron bebas pada N</small></div>`;
 if(i===2)return chip+`<div class="electron-motion scene-pair"><span class="n-center">N</span><span class="free-pair above-n">••</span><span class="scene-note">Pasangan elektron bebas di atas N</span></div>`;
 if(i===3)return chip+`<div class="electron-motion approaching"><span class="n-center">N</span><span class="free-pair above-n">••</span><span class="moving-h">H⁺</span><span class="motion-label">H⁺ mendekati N • pasangan elektron tetap di atas N</span></div>`;
 if(i===4)return chip+`<div class="electron-motion donating"><span class="n-center">N</span><span class="free-pair moving-pair">••</span><span class="moving-h target-h">H⁺</span><span class="motion-arrow">⟶</span><span class="motion-label">Pasangan elektron bergerak dari N ke H⁺</span></div>`;
 return chip+`<div class="product-scene"><div class="product-ion">NH₄⁺</div><div class="product-bonds"><span>N—H</span><span>N—H</span><span>N—H</span><span>N—H</span></div><p>NH₃ + H⁺ → NH₄⁺</p></div>`;
}
function setStage(i){
 stage=Math.max(0,Math.min(stages.length-1,i));
 document.getElementById('stageLabel').textContent=`Tahap ${stage+1}/6`;
 document.getElementById('stageTitle').textContent=stages[stage][0];
 document.getElementById('stageText').textContent=stages[stage][1];
 document.getElementById('simScene').innerHTML=sceneMarkup(stage);
 document.querySelectorAll('.stage-chip').forEach((x,j)=>x.classList.toggle('active',j===stage));
 document.querySelectorAll('.stage-chip').forEach((x,j)=>x.setAttribute('aria-current',j===stage?'step':'false'));
}
function nextStage(){setStage(Math.min(5,stage+1))}
function prevStage(){setStage(Math.max(0,stage-1))}
const stagesEl=document.getElementById('stages');
stages.forEach((s,i)=>{const b=document.createElement('button');b.className='stage-chip';b.type='button';b.textContent=`${i+1}. ${s[0]}`;b.onclick=()=>setStage(i);stagesEl.appendChild(b)});
setStage(0);
function speak(t){
 if(!('speechSynthesis'in window)){alert('Browser ini belum mendukung audio otomatis.');return;}
 window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang='id-ID';u.rate=.93;u.pitch=1;window.speechSynthesis.speak(u);
}
function speakSimulation(){speak(stageNarrations[stage])}
function speakVideoExplanation(){speak('Dalam kehidupan sehari-hari, nitrogen penting bagi pertumbuhan tanaman. Amonia memiliki pasangan elektron bebas pada atom nitrogen. Ketika amonia menerima ion hidrogen, pasangan elektron itu digunakan bersama sehingga terbentuk ion amonium. Ion amonium merupakan salah satu bentuk nitrogen yang dapat dijumpai di tanah dan berkaitan dengan pertanian.')}
function revealPrompt(n){const answer=document.getElementById('prompt'+n);const feedback=document.getElementById('feedback'+n);if(!answer.value.trim()){answer.focus();answer.setCustomValidity('Tuliskan jawaban singkat terlebih dahulu sebelum memeriksa penjelasan.');answer.reportValidity();answer.addEventListener('input',()=>answer.setCustomValidity(''),{once:true});return;}feedback.hidden=false;feedback.classList.add('revealed');const btn=answer.parentElement.querySelector('button');if(btn){btn.disabled=true;btn.textContent='Penjelasan sudah dibuka';}}
function saveEssays(){
 const values=['essay1','essay2','essay3'].map(id=>document.getElementById(id).value);
 try{localStorage.setItem('chemBondEssays',JSON.stringify(values));}catch(e){}
 document.getElementById('essaySaved').textContent=' ✓ Jawaban esai tersimpan di perangkat.';
}
try{
 const saved=JSON.parse(localStorage.getItem('chemBondEssays')||'[]');
 ['essay1','essay2','essay3'].forEach((id,i)=>{if(saved[i])document.getElementById(id).value=saved[i]});
}catch(e){}
let currentStep=1;
function applyLockState(){
 sectionIds.forEach((id,i)=>{
  const el=document.getElementById(id);
  if(el)el.classList.toggle('locked',i+1>currentStep);
 });
 document.querySelectorAll('.topbar nav a').forEach(a=>{
  const id=(a.getAttribute('href')||'').slice(1);
  const idx=sectionIds.indexOf(id)+1;
  const enabled=idx>0&&idx<=currentStep;
  a.classList.toggle('nav-locked',!enabled);
  a.setAttribute('aria-disabled',String(!enabled));
  a.tabIndex=enabled?0:-1;
 });
 updateProgress();
}
function goStep(n){
 if(n<1||n>sectionIds.length)return;
 if(n>currentStep+1||n>currentStep)return;
 const el=document.getElementById(sectionIds[n-1]);
 if(el){el.scrollIntoView({behavior:'smooth',block:'start'});history.replaceState(null,'','#'+sectionIds[n-1]);}
}
function advanceStep(n){
 if(n<1||n>sectionIds.length)return;
 if(n===currentStep+1)currentStep=n;
 else if(n>currentStep+1)return;
 applyLockState();
 const el=document.getElementById(sectionIds[n-1]);
 if(el){el.scrollIntoView({behavior:'smooth',block:'start'});history.replaceState(null,'','#'+sectionIds[n-1]);}
}
function restartLearning(){currentStep=1;applyLockState();document.getElementById('beranda').scrollIntoView({behavior:'smooth',block:'start'});history.replaceState(null,'','#beranda');}
document.querySelectorAll('.slide-step .next-step').forEach(btn=>{
 const old=btn.getAttribute('onclick')||'';
 const match=old.match(/goStep\((\d+)\)/);
 if(match)btn.setAttribute('onclick',`advanceStep(${match[1]})`);
});
document.querySelectorAll('.topbar nav a').forEach(a=>a.addEventListener('click',e=>{
 const id=(a.getAttribute('href')||'').slice(1),idx=sectionIds.indexOf(id)+1;
 if(idx<1||idx>currentStep){e.preventDefault();return;}
 e.preventDefault();document.getElementById(id)?.scrollIntoView({behavior:'smooth',block:'start'});history.replaceState(null,'','#'+id);
}));
currentStep=1;applyLockState();document.body.classList.add('navigation-locked');history.replaceState(null,'','#beranda');
// Pengguliran tetap aktif di dalam slide yang sedang dibuka, tetapi tidak boleh
// membawa pengguna ke slide lain; perpindahan slide hanya melalui tombol.
function activeSlideBounds(){
 const el=document.getElementById(sectionIds[currentStep-1]);
 if(!el)return {top:0,bottom:document.documentElement.scrollHeight};
 const r=el.getBoundingClientRect();
 return {top:r.top+window.scrollY,bottom:r.bottom+window.scrollY};
}
document.addEventListener('wheel',e=>{
 if(e.ctrlKey)return;
 const b=activeSlideBounds(),y=window.scrollY,atTop=y<=b.top+2,atBottom=y+window.innerHeight>=b.bottom-2;
 if((e.deltaY<0&&atTop)||(e.deltaY>0&&atBottom))e.preventDefault();
},{passive:false});
let touchStartY=0;
document.addEventListener('touchstart',e=>{touchStartY=e.touches[0]?.clientY||0},{passive:true});
document.addEventListener('touchmove',e=>{
 const y=e.touches[0]?.clientY||touchStartY,delta=touchStartY-y,b=activeSlideBounds();
 const atTop=window.scrollY<=b.top+2,atBottom=window.scrollY+window.innerHeight>=b.bottom-2;
 if((delta<0&&atTop)||(delta>0&&atBottom))e.preventDefault();
},{passive:false});
document.addEventListener('keydown',e=>{
 if(['TEXTAREA','INPUT'].includes(document.activeElement.tagName)||e.altKey||e.ctrlKey||e.metaKey)return;
 const b=activeSlideBounds(),y=window.scrollY,atTop=y<=b.top+2,atBottom=y+window.innerHeight>=b.bottom-2;
 if((['ArrowUp','PageUp','Home'].includes(e.key)&&atTop)||(['ArrowDown','PageDown','End',' '].includes(e.key)&&atBottom))e.preventDefault();
});
function updateProgress(){
 const pct=Math.round(((currentStep-1)/(sectionIds.length-1))*100);
 const bar=document.getElementById('progressBar'),txt=document.getElementById('progressText');
 if(bar)bar.style.width=pct+'%';if(txt)txt.textContent=`Progres belajar ${pct}%`;
}
addEventListener('scroll',()=>{ /* progres mengikuti tahapan yang sudah dibuka, bukan posisi scroll */});
