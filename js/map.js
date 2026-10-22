// ===== MAPA: CARTO Voyager, límites del campus, marcadores y pin =====
(function(U){
const map=U.map=L.map("map",{minZoom:16,maxBounds:U.BOUNDS,maxBoundsViscosity:1}).setView(U.CENTER,17);
L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",{subdomains:"abcd",maxZoom:20,attribution:"© OpenStreetMap © CARTO"}).addTo(map);
const bl=L.layerGroup().addTo(map),il=L.layerGroup().addTo(map);U.mk={};
U.draw=()=>{
  bl.clearLayers();il.clearLayers();U.mk={};
  U.B.forEach(b=>{
    const s=U.status(b.c),cl=s.cierre?"closed":s.n?"warn":"",ic=s.cierre?"⛔":s.n?"⚠️":"",
      tx=s.cierre?"acceso cerrado":s.n?`${s.n} incidencia(s) activa(s)`:"sin incidencias",t=`Edificio ${b.c}: ${b.n}, ${tx}${U.isFav(b.c)?", favorito":""}`;
    L.rectangle([[b.lat-1.8e-4,b.lng-2.5e-4],[b.lat+1.8e-4,b.lng+2.5e-4]],{color:"#0a2f73",weight:2,fillOpacity:.12,interactive:false}).addTo(bl);
    L.marker([b.lat,b.lng],{icon:L.divIcon({className:"bm "+cl,html:`${U.isFav(b.c)?"★":""}${b.c}${ic}`,iconSize:[56,32]}),title:t,alt:t}).addTo(bl).on("click",()=>U.sel(b));
  });
  U.S.inc.filter(U.active).forEach(i=>{U.mk[i.id]=L.marker([i.lat,i.lng],{icon:L.divIcon({className:"im",html:U.T[i.t][0],iconSize:[40,40]}),title:`${U.T[i.t][1]}: ${i.d}`,alt:`${U.T[i.t][1]}: ${i.d}`}).bindPopup(()=>`<div class="pop">${U.body(i)}</div>`,{maxWidth:290}).addTo(il)});
  U.onDraw&&U.onDraw();
};
// Pin manual (arrastrable, flechas del teclado o toque en el mapa)
let pin=null,on=false,me=null;
U.pinStart=()=>{
  U.pinEnd();on=true;
  pin=L.marker(map.getCenter(),{draggable:true,title:"Pin de ubicación. Usa las flechas para moverlo.",icon:L.divIcon({className:"pin",html:"📌",iconSize:[44,44],iconAnchor:[22,44]})}).addTo(map);
  pin._icon.addEventListener("keydown",e=>{const d={ArrowUp:[1,0],ArrowDown:[-1,0],ArrowLeft:[0,-1],ArrowRight:[0,1]}[e.key];if(d){e.preventDefault();e.stopPropagation();const c=pin.getLatLng();pin.setLatLng([c.lat+d[0]*2e-5,c.lng+d[1]*2.5e-5])}});
  pin._icon.focus();
};
map.on("click",e=>{if(on&&pin)pin.setLatLng(e.latlng)});
U.pinGet=()=>pin.getLatLng();
U.pinEnd=()=>{if(pin)pin.remove();pin=null;on=false};
U.me=(la,ln)=>{if(me)me.remove();me=L.circleMarker([la,ln],{radius:9,color:"#fff",weight:3,fillColor:"#1a73e8",fillOpacity:1}).addTo(map)};
})(window.UPV);
