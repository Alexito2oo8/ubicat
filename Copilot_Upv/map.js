// ===== MAPA: plano UPV georreferenciado, accesos, incidencias y alternativas =====
(function(U){
const ZC={1:"#c0392b",2:"#8e44ad",3:"#b7950b",4:"#1e8449",5:"#c2185b",6:"#7b241c",7:"#117a8b",8:"#d35400",9:"#d35400"};
U.BOUNDS=L.latLngBounds(U.ALL.concat(U.M).map(p=>[p.lat,p.lng])).pad(.2);
const map=U.map=L.map("map",{minZoom:16,maxBounds:U.BOUNDS.pad(.1),maxBoundsViscosity:1}).setView(U.BOUNDS.getCenter(),17);
L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",{subdomains:"abcd",maxZoom:20,attribution:"© OpenStreetMap © CARTO"}).addTo(map);
U.B.forEach(b=>L.polygon(b.poly,{color:ZC[b.z],weight:2,fillColor:ZC[b.z],fillOpacity:.3,interactive:false}).addTo(map));
const zoom=()=>map.getContainer().classList.toggle("lo",map.getZoom()<17);map.on("zoomend",zoom);zoom();

// Una puerta está afectada si hay una incidencia activa a menos de 60 m
U.blocked=g=>U.S.inc.some(i=>U.active(i)&&i.t!=="otro"&&U.dist(i.lat,i.lng,g.lat,g.lng)<60);
// Alternativa: puerta más cercana sin incidencias
U.alt=i=>{if(!["cierre","rampa","obra"].includes(i.t))return null;
  const c=U.G.filter(g=>!U.blocked(g)).sort((a,b)=>U.dist(i.lat,i.lng,a.lat,a.lng)-U.dist(i.lat,i.lng,b.lat,b.lng))[0];
  return c?{g:c,d:Math.round(U.dist(i.lat,i.lng,c.lat,c.lng))}:null};
U.altHtml=i=>{const a=U.alt(i);return a?`<p class="alt"><b>${U.L("Alternativa sugerida","Suggested alternative")}:</b> ${U.L("usa la","use")} ${a.g.n} (≈${a.d} m ${U.L("en línea recta","in a straight line")})</p>`:""};

const bl=L.layerGroup().addTo(map),il=L.layerGroup().addTo(map),rt=L.layerGroup().addTo(map);U.mk={};
U.draw=()=>{
  bl.clearLayers();il.clearLayers();U.mk={};
  U.B.forEach(b=>{
    const s=U.status(b.c),cl=s.cierre?"closed":s.n?"warn":"",ic=s.cierre?"⛔":s.n?"⚠️":"",
      t=U.tr(`${b.n}, `+(s.cierre?"acceso cerrado":s.n?`${s.n} incidencia(s) activa(s)`:"sin incidencias")+(U.isFav(b.c)?", favorito":""));
    L.marker([b.lat,b.lng],{icon:L.divIcon({className:"bm "+cl,html:`${U.isFav(b.c)?"★":""}${b.c}${ic}`,iconSize:[44,26]}),title:t,alt:t}).addTo(bl).on("click",()=>U.sel(b));
  });
  U.G.concat(U.M).forEach(g=>{
    const m=g.kind==="metro",bk=!m&&U.blocked(g),t=U.tr(g.n+(bk?", con incidencia":""));
    L.marker([g.lat,g.lng],{icon:L.divIcon({className:"gate "+(m?"metro":bk?"bad":""),html:m?"🚇":`🚪${g.c}${bk?"⛔":""}`,iconSize:[m?40:56,36]}),title:t,alt:t}).addTo(bl).on("click",()=>U.sel(g));
  });
  U.S.inc.filter(U.active).forEach(i=>{
    const t=U.tr(`${U.T[i.t][1]}: ${i.d}`);
    U.mk[i.id]=L.marker([i.lat,i.lng],{iid:i.id,icon:L.divIcon({className:"im",html:U.T[i.t][0],iconSize:[40,40]}),title:t,alt:t}).bindPopup(()=>U.tr(`<div class="pop">${U.body(i)}</div>`),{maxWidth:290}).addTo(il);
  });
  U.legend&&U.legend();U.onDraw&&U.onDraw();
};
// Ruta alternativa dibujada al abrir una incidencia
map.on("popupopen",e=>{rt.clearLayers();const i=U.S.inc.find(x=>x.id===e.popup._source.options.iid),a=i&&U.alt(i);
  if(a)L.polyline([[i.lat,i.lng],[a.g.lat,a.g.lng]],{color:"#0a2f73",weight:5,dashArray:"2 10"}).addTo(rt)});
map.on("popupclose",()=>rt.clearLayers());
const lg=L.control({position:"topright"});
lg.onAdd=()=>{const d=L.DomUtil.create("div","legend");d.setAttribute("role","note");U.legend=()=>{d.innerHTML=U.tr("🚪 Puerta de acceso · 🚇 Metro · ⚠️ Con incidencia · ⛔ Cerrado")};U.legend();return d};
lg.addTo(map);

// Pin manual (arrastrable, flechas del teclado o toque en el mapa)
let pin=null,on=false,me=null;
U.pinStart=()=>{
  U.pinEnd();on=true;
  pin=L.marker(map.getCenter(),{draggable:true,title:U.tr("Pin de ubicación. Usa las flechas para moverlo."),icon:L.divIcon({className:"pin",html:"📌",iconSize:[44,44],iconAnchor:[22,44]})}).addTo(map);
  pin._icon.addEventListener("keydown",e=>{const d={ArrowUp:[1,0],ArrowDown:[-1,0],ArrowLeft:[0,-1],ArrowRight:[0,1]}[e.key];if(d){e.preventDefault();e.stopPropagation();const c=pin.getLatLng();pin.setLatLng([c.lat+d[0]*2e-5,c.lng+d[1]*2.5e-5])}});
  pin._icon.focus();
};
map.on("click",e=>{if(on&&pin)pin.setLatLng(e.latlng)});
U.pinGet=()=>pin.getLatLng();
U.pinEnd=()=>{if(pin)pin.remove();pin=null;on=false};
U.me=(la,ln)=>{if(me)me.remove();me=L.circleMarker([la,ln],{radius:9,color:"#fff",weight:3,fillColor:"#1a73e8",fillOpacity:1}).addTo(map)};
})(window.UPV);
