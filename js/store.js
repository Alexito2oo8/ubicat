// ===== UTILIDADES Y DATOS (simulados en localStorage) =====
(function(U){
const K="copiloto-upv-v2";
U.$=s=>document.querySelector(s);
U.esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
U.norm=s=>s.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
U.say=m=>{const l=U.$("#live");l.textContent="";setTimeout(()=>l.textContent=m,50)};
U.ago=ts=>{const m=Math.round((Date.now()-ts)/6e4);return m<1?"Hace un momento":m<60?`Hace ${m} min`:m<1440?`Hace ${Math.round(m/60)} h`:`Hace ${Math.round(m/1440)} d`};
U.dist=(a,b,c,d)=>Math.hypot((a-c)*111e3,(b-d)*86e3);
U.near=(lat,lng,r=150)=>U.B.filter(b=>U.dist(lat,lng,b.lat,b.lng)<r).sort((x,y)=>U.dist(lat,lng,x.lat,x.lng)-U.dist(lat,lng,y.lat,y.lng))[0]||null;
function seed(){const n=Date.now(),m=6e4,B=U.B;return[
{id:1,t:"asc",d:"Ascensor principal fuera de servicio.",a:"Usa el ascensor de la entrada norte, junto a la cafetería.",lat:B[0].lat+1e-4,lng:B[0].lng+1e-4,b:"1",ts:n-180*m,last:n-180*m,y:2,n:0},
{id:2,t:"rampa",d:"Rampa de acceso bloqueada por vallas.",a:"Entra por la puerta lateral sur, sin escalones.",lat:B[3].lat-1e-4,lng:B[3].lng+1e-4,b:"4N",ts:n-50*m,last:n-50*m,y:1,n:0},
{id:3,t:"obra",d:"Obras en el paso peatonal.",a:"Rodea por el paseo junto a la Biblioteca.",lat:B[5].lat+1e-4,lng:B[5].lng+2e-4,b:"ÁG",ts:n-1440*m,last:n-300*m,y:3,n:1}]}
let S;try{S=JSON.parse(localStorage.getItem(K))}catch(e){}
S=S||{inc:seed(),fav:[],hc:0,fs:0};
U.S=S;U.save=()=>{try{localStorage.setItem(K,JSON.stringify(S))}catch(e){}};
// Una incidencia se retira con 2 "No" más que "Sí", o a las 48 h sin confirmación.
U.active=i=>i.n-i.y<2&&Date.now()-i.last<48*36e5;
U.add=o=>{const t=Date.now(),b=U.near(o.lat,o.lng),i={id:t,t:o.t,d:o.d,a:o.a,lat:o.lat,lng:o.lng,b:b?b.c:null,ts:t,last:t,y:1,n:0};S.inc.push(i);U.save();return i};
U.vote=(id,yes)=>{const i=S.inc.find(x=>x.id==id);yes?(i.y++,i.last=Date.now()):i.n++;U.save();return i};
U.isFav=c=>S.fav.includes(c);
U.toggleFav=c=>{S.fav=U.isFav(c)?S.fav.filter(x=>x!==c):[...S.fav,c];U.save()};
U.forB=c=>S.inc.filter(i=>i.b===c&&U.active(i));
// Centro de alertas: solo favoritos (o todo el campus si all=true)
U.alerts=all=>S.inc.filter(i=>U.active(i)&&(all||U.isFav(i.b))).sort((a,b)=>b.ts-a.ts);
U.status=c=>{const l=U.forB(c).map(i=>i.t);return{asc:l.includes("asc"),rampa:l.includes("rampa"),cierre:l.includes("cierre"),obra:l.includes("obra"),n:l.length}};
})(window.UPV);
