// ===== INTERFAZ: buscador, ficha, favoritos, alertas, reporte y accesibilidad =====
(function(U){
const $=U.$,esc=U.esc,S=U.S;let loc=null,curB=null;

// --- Contenido de una incidencia (popup y listas)
U.body=i=>`<strong>${U.T[i.t][0]} ${U.T[i.t][1]}</strong><p>${esc(i.d)}</p>${i.a?`<p class="alt"><b>Alternativa accesible:</b> ${esc(i.a)}</p>`:""}${U.altHtml(i)}
<p class="meta">${U.ago(i.ts)} · Confirmada ${i.y} · Desmentida ${i.n}</p><p><b>¿Sigue esta incidencia presente?</b></p>
<div class="row"><button class="btn ok" data-act="y" data-id="${i.id}">Sí, sigue</button><button class="btn no" data-act="n" data-id="${i.id}">No, ya no</button><button class="btn" data-act="s" data-id="${i.id}" aria-label="Leer en voz alta">🔊</button></div>`;
function speak(i){
  if(!("speechSynthesis" in window))return U.say("Tu navegador no admite lectura en voz alta.");
  speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(U.tr(`${U.T[i.t][1]}. ${i.d}. ${i.a?"Alternativa accesible: "+i.a+".":""} ${U.ago(i.ts)}.`));u.lang=U.lang==="en"?"en-GB":"es-ES";speechSynthesis.speak(u);
}

// --- Ficha de edificio con indicadores de estado (icono + texto, no solo color)
function sel(b,keep){
  curB=b;const k=b.kind,f=U.isFav(b.c),bk=k==="gate"&&U.blocked(b),s=k?null:U.status(b.c);
  const st=k==="gate"?`<li class="chip ${bk?"bad x":""}">${bk?"⛔ Puerta con incidencia":"✅ Puerta de acceso abierta"}</li>`:k?"":
   `<li class="chip ${s.asc?"bad":""}">${s.asc?"🛗 Ascensor: averiado":"✅ Ascensor: operativo"}</li><li class="chip ${s.rampa?"bad":""}">${s.rampa?"♿ Rampa: bloqueada":"✅ Rampa: libre"}</li><li class="chip ${s.cierre?"bad x":s.obra?"bad":""}">${s.cierre?"⛔ Acceso: cerrado":s.obra?"🚧 Acceso: con obras":"✅ Acceso: abierto"}</li>`;
  $("#sheet").innerHTML=U.tr(`<h2 id="sh">${esc(b.n)}</h2>${k?"":`<p><b>Código:</b> ${esc(b.c)} · ${U.L("Zona","Zone")} ${b.z}</p>`}
  ${st?`<ul class="st" aria-label="Estado de accesos">${st}</ul>`:""}${bk?U.altHtml({t:"cierre",lat:b.lat,lng:b.lng}):""}
  <div class="row"><a class="btn big" href="https://www.google.com/maps/dir/?api=1&destination=${b.lat},${b.lng}&travelmode=walking" target="_blank" rel="noopener">Cómo llegar<span class="sr"> (abre Google Maps)</span></a>
  ${k?"":`<button class="btn" data-act="f" data-c="${b.c}" aria-pressed="${f}">${f?"★ Quitar de favoritos":"☆ Añadir a favoritos"}</button>`}
  ${k==="metro"?"":`<button class="btn" data-act="r" data-k="${U.ALL.indexOf(b)}">Avisar aquí</button>`}<button class="btn" data-act="x">Cerrar ficha</button></div>`);
  $("#sheet").hidden=false;
  if(!keep){U.map.flyTo([b.lat,b.lng],18);U.say(`${b.n}. Ficha abierta.`)}
}
U.sel=sel;

// --- Buscador con autocompletado
const q=$("#q"),ls=$("#ls");let opts=[],ai=-1;
const hide=()=>{ls.hidden=true;q.setAttribute("aria-expanded","false");q.removeAttribute("aria-activedescendant");ai=-1};
const pick=b=>{q.value=`${b.c} · ${b.n}`;hide();sel(b)};
const hl=()=>{ls.querySelectorAll("li").forEach((li,k)=>li.setAttribute("aria-selected",k===ai));q.setAttribute("aria-activedescendant","o"+ai)};
q.addEventListener("input",()=>{
  const t=U.norm(q.value.trim());opts=t?U.ALL.filter(b=>U.norm(b.c+" "+b.es+" "+b.ne).includes(t)).slice(0,6):[];
  ls.innerHTML=opts.map((b,k)=>`<li role="option" id="o${k}" aria-selected="false" data-k="${k}">${esc(b.c)} · ${esc(b.n)}</li>`).join("");
  ai=-1;ls.hidden=!opts.length;q.setAttribute("aria-expanded",String(!!opts.length));
  if(t)U.say(opts.length?`${opts.length} edificios encontrados`:"Sin resultados");
});
q.addEventListener("keydown",e=>{
  if(e.key==="ArrowDown"&&opts.length){e.preventDefault();ai=(ai+1)%opts.length;hl()}
  else if(e.key==="ArrowUp"&&opts.length){e.preventDefault();ai=(ai-1+opts.length)%opts.length;hl()}
  else if(e.key==="Enter"&&opts.length){e.preventDefault();pick(opts[ai>=0?ai:0])}
  else if(e.key==="Escape")hide();
});
ls.addEventListener("click",e=>{const li=e.target.closest("li");if(li)pick(opts[li.dataset.k])});

// --- Centro de alertas (solo favoritos por defecto)
function renderAlerts(){
  const all=$("#all").checked,l=U.alerts(all);
  $("#favs").innerHTML=U.tr(S.fav.length?S.fav.map(c=>{const b=U.B.find(x=>x.c===c);return`<li>★ ${esc(b.n)} <button class="btn" data-act="f" data-c="${c}" aria-label="Quitar ${esc(b.n)} de favoritos">Quitar</button></li>`}).join(""):"<li>Aún no tienes favoritos. Abre un edificio y pulsa «Añadir a favoritos».</li>");
  $("#alist").innerHTML=U.tr(l.length?l.map(i=>`<li>${U.body(i)}<div class="row"><button class="btn pri" data-act="g" data-id="${i.id}">Ver en el mapa</button></div></li>`).join(""):`<li>${all?"No hay incidencias activas en el campus.":"Sin alertas en tus edificios favoritos."}</li>`);
}
U.onDraw=()=>{$("#cnt").textContent=U.alerts(false).length;if($("#alr").open)renderAlerts()};
$("#all").onchange=renderAlerts;
const openAlerts=()=>{renderAlerts();$("#alr").showModal()};
$("#bAlerts").onclick=openAlerts;
$("#sim").onclick=()=>{
  const b=U.B[Math.floor(Math.random()*U.B.length)],t=Object.keys(U.T)[Math.floor(Math.random()*4)];
  const i=U.add({t,d:"Aviso simulado de otro usuario.",a:"Consulta la señalización del edificio.",lat:b.lat+(Math.random()-.5)*1e-4,lng:b.lng+(Math.random()-.5)*1e-4});
  U.draw();U.say(U.isFav(i.b)?`Nueva alerta en tu favorito ${b.n}: ${U.T[t][1]}`:`Aviso simulado en ${b.n}. No es favorito, así que no genera alerta.`);
};

// --- Reporte: GPS o pin manual en el punto exacto
const setLoc=l=>{loc=l;$("#locInfo").textContent=U.tr(l?`Ubicación: ${l.label}`:"Ubicación: sin elegir")};
function openReport(l){setLoc(l||null);$("#dlg").showModal()}
U.typeOpts=()=>{const o=$("#type").value;$("#type").innerHTML=U.tr(Object.entries(U.T).map(([k,v])=>`<option value="${k}">${v[0]} ${v[1]}</option>`).join(""));if(o)$("#type").value=o};U.typeOpts();
$("#fab").onclick=()=>openReport();
$("#gps").onclick=()=>{
  if(!navigator.geolocation)return U.say("Tu navegador no admite GPS. Coloca un pin en el mapa.");
  $("#locInfo").textContent=U.tr("Buscando tu ubicación…");
  navigator.geolocation.getCurrentPosition(p=>{
    const{latitude:la,longitude:ln,accuracy:ac}=p.coords;
    if(!L.latLngBounds(U.BOUNDS).contains([la,ln])){setLoc(null);return U.say("Estás fuera del campus. Coloca un pin en el mapa.")}
    setLoc({lat:la,lng:ln,label:`GPS (precisión ±${Math.round(ac)} m)`});U.me(la,ln);U.say(`Ubicación detectada, precisión ${Math.round(ac)} metros.`);
  },()=>{setLoc(null);U.say("No se pudo obtener tu ubicación. Coloca un pin en el mapa.")},{enableHighAccuracy:true,timeout:15000});
};
$("#pin").onclick=()=>{$("#dlg").close();$("#pinbar").hidden=false;U.pinStart();U.say("Modo pin. Mueve el pin con las flechas o toca el mapa y pulsa Confirmar ubicación.")};
$("#pinOk").onclick=()=>{const p=U.pinGet(),b=U.near(p.lat,p.lng);U.pinEnd();$("#pinbar").hidden=true;setLoc({lat:p.lat,lng:p.lng,label:`pin en el mapa${b?` (cerca del edificio ${b.c})`:""}`});$("#dlg").showModal()};
$("#pinNo").onclick=()=>{U.pinEnd();$("#pinbar").hidden=true;$("#dlg").showModal()};
$("#f").addEventListener("submit",e=>{
  e.preventDefault();
  if(!loc){U.say("Elige primero la ubicación: GPS o pin en el mapa.");return $("#gps").focus()}
  const i=U.add({t:$("#type").value,d:$("#desc").value.trim(),a:$("#alt").value.trim(),lat:loc.lat,lng:loc.lng});
  $("#dlg").close();$("#f").reset();U.draw();U.map.flyTo([i.lat,i.lng],19);
  U.say(U.isFav(i.b)?"Aviso publicado en uno de tus favoritos.":"Aviso publicado. Gracias por avisar.");
});

// --- Acciones (botones con data-act)
document.addEventListener("click",e=>{
  const b=e.target.closest("[data-act]");if(!b)return;
  const a=b.dataset.act,i=b.dataset.id&&S.inc.find(x=>x.id==b.dataset.id);
  if(a==="y"||a==="n"){U.vote(i.id,a==="y");U.map.closePopup();U.draw();U.say(a==="y"?"Gracias. Incidencia confirmada.":U.active(i)?"Gracias, respuesta registrada.":"Gracias. La incidencia se ha retirado del mapa.")}
  else if(a==="s")speak(i);
  else if(a==="g"){$("#alr").close();U.map.flyTo([i.lat,i.lng],19);setTimeout(()=>U.mk[i.id]&&U.mk[i.id].openPopup(),700)}
  else if(a==="x")$("#sheet").hidden=true;
  else if(a==="c")b.closest("dialog").close();
  else if(a==="r"){const c=U.ALL[b.dataset.k];openReport({lat:c.lat,lng:c.lng,label:c.kind?c.n:`edificio ${c.c} · ${c.n}`})}
  else if(a==="f"){
    const c=b.dataset.c,was=U.isFav(c);U.toggleFav(c);U.draw();
    if(curB&&curB.c===c&&b.closest("#sheet")){sel(curB,true);$("#sheet [data-act=f]").focus()}
    U.say(was?"Quitado de favoritos.":"Añadido a favoritos. Recibirás sus alertas.");
  }
});

// --- Accesibilidad: contraste, tamaño de texto y atajos
function prefs(){document.documentElement.classList.toggle("hc",!!S.hc);document.documentElement.style.setProperty("--fs",[16,19,22][S.fs]+"px");$("#hc").setAttribute("aria-pressed",String(!!S.hc));U.save()}
$("#hc").onclick=()=>{S.hc=S.hc?0:1;prefs()};
$("#fsUp").onclick=()=>{S.fs=Math.min(2,S.fs+1);prefs()};
$("#fsDn").onclick=()=>{S.fs=Math.max(0,S.fs-1);prefs()};
$("#bA11y").onclick=()=>$("#adlg").showModal();
document.addEventListener("keydown",e=>{
  if(e.ctrlKey||e.metaKey||e.altKey||/INPUT|TEXTAREA|SELECT/.test(e.target.tagName)||document.querySelector("dialog[open]"))return;
  const k=e.key.toLowerCase();
  if(k==="/"){e.preventDefault();q.focus()}
  else if(k==="r")openReport();
  else if(k==="a")openAlerts();
  else if(k==="h")$("#adlg").showModal();
  else if(k==="f"&&curB){U.toggleFav(curB.c);U.draw();sel(curB,true);U.say(U.isFav(curB.c)?"Añadido a favoritos.":"Quitado de favoritos.")}
});
prefs();U.onLang=()=>{U.typeOpts();setLoc(loc);if(curB&&!$("#sheet").hidden)sel(curB,true);if($("#alr").open)renderAlerts()};U.setLang(S.lang||"es");
{const n=U.alerts(false).length;if(S.fav.length)U.say(`Tienes ${n} alertas activas en tus edificios favoritos.`)}
})(window.UPV);
