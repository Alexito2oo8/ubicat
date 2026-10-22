// ===== IDIOMA ES/EN =====
// Para traducir una frase nueva: añade  "texto en español":"English text"  a la lista EN.
(function(U){
const EN={
"Copiloto Accesible UPV":"UPV Accessible Copilot","Saltar al mapa":"Skip to map",
"Buscar edificio por nombre o código (atajo: barra /)":"Search a building by name or code (shortcut: /)",
"Busca un edificio o puerta (ej. 1G, Puerta A)":"Search a building or gate (e.g. 1G, Gate A)","Edificios encontrados":"Buildings found",
"en tus favoritos":"in your favourites","Alertas de tus edificios favoritos":"Alerts for your favourite buildings","Alertas":"Alerts",
"Ajustes de accesibilidad y atajos":"Accessibility settings and shortcuts","Ajustes de accesibilidad":"Accessibility settings","Ajustes":"Settings",
"Mueve el pin (arrastra, toca el mapa o usa las flechas)":"Move the pin (drag, tap the map or use the arrow keys)",
"Confirmar ubicación":"Confirm location","Cancelar":"Cancel","Cerrar ficha":"Close panel","Cerrar":"Close",
"Mapa del Campus de Vera con edificios e incidencias":"Vera Campus map with buildings, access gates and incidents",
"Avisar de una incidencia":"Report an incident","¿Qué ocurre?":"What is happening?","Ubicación: sin elegir":"Location: not set","Ubicación: ":"Location: ",
"📍 Usar mi GPS":"📍 Use my GPS","📌 Colocar pin en el mapa":"📌 Place a pin on the map","Descripción breve":"Short description",
"Alternativa accesible sugerida (opcional)":"Suggested accessible alternative (optional)","Ej. Usa la entrada lateral, sin escalones":"E.g. Use the side entrance, no steps",
"Publicar aviso":"Post report","Tus favoritos":"Your favourites","Ver también las incidencias de todo el campus":"Also show incidents across the whole campus",
"Demo: simular aviso de otro usuario":"Demo: simulate a report from another user","Alto contraste":"High contrast","Texto más pequeño":"Smaller text","Texto más grande":"Larger text",
"Atajos de teclado":"Keyboard shortcuts","buscar ·":"search ·","avisar de incidencia ·":"report incident ·","alertas ·":"alerts ·","favorito del edificio abierto ·":"favourite of the open building ·","estos ajustes ·":"these settings ·","cerrar":"close",
"Puerta de acceso abierta":"Access gate open","Puerta con incidencia":"Gate with an incident","Puerta de acceso":"Access gate","Con incidencia":"With incident",
"Ascensor averiado":"Lift out of order","Acceso cerrado":"Access closed","acceso cerrado":"access closed","Rampa bloqueada":"Ramp blocked","Obras":"Roadworks","Otra incidencia":"Other incident",
"incidencia(s) activa(s)":"active incident(s)","sin incidencias":"no incidents",", favorito":", favourite",", con incidencia":", with an incident","Cerrado":"Closed",
"Alternativa accesible:":"Accessible alternative:","Confirmada":"Confirmed","Desmentida":"Disputed","¿Sigue esta incidencia presente?":"Is this incident still there?",
"Sí, sigue":"Yes, still there","No, ya no":"No, it's gone","Leer en voz alta":"Read aloud",
"Código:":"Code:","Estado de accesos":"Access status","🛗 Ascensor: averiado":"🛗 Lift: out of order","✅ Ascensor: operativo":"✅ Lift: working","♿ Rampa: bloqueada":"♿ Ramp: blocked","✅ Rampa: libre":"✅ Ramp: clear",
"⛔ Acceso: cerrado":"⛔ Access: closed","🚧 Acceso: con obras":"🚧 Access: roadworks","✅ Acceso: abierto":"✅ Access: open","Cómo llegar":"Get directions"," (abre Google Maps)":" (opens Google Maps)",
"★ Quitar de favoritos":"★ Remove from favourites","☆ Añadir a favoritos":"☆ Add to favourites","Avisar aquí":"Report here","Quitar":"Remove","de favoritos":"from favourites",
"Aún no tienes favoritos. Abre un edificio y pulsa «Añadir a favoritos».":"You have no favourites yet. Open a building and press “Add to favourites”.",
"Ver en el mapa":"Show on map","No hay incidencias activas en el campus.":"There are no active incidents on campus.","Sin alertas en tus edificios favoritos.":"No alerts in your favourite buildings.",
"Tu navegador no admite lectura en voz alta.":"Your browser does not support reading aloud.","Tu navegador no admite GPS. Coloca un pin en el mapa.":"Your browser does not support GPS. Place a pin on the map.",
"Buscando tu ubicación…":"Finding your location…","Estás fuera del campus. Coloca un pin en el mapa.":"You are outside the campus. Place a pin on the map.",
"Ubicación detectada, precisión ":"Location detected, accuracy "," metros.":" metres.","No se pudo obtener tu ubicación. Coloca un pin en el mapa.":"Could not get your location. Place a pin on the map.",
"Modo pin. Mueve el pin con las flechas o toca el mapa y pulsa Confirmar ubicación.":"Pin mode. Move the pin with the arrow keys or tap the map, then press Confirm location.",
"Elige primero la ubicación: GPS o pin en el mapa.":"Choose a location first: GPS or a pin on the map.","GPS (precisión ±":"GPS (accuracy ±","pin en el mapa":"pin on the map","(cerca del edificio ":"(near building ","edificio ":"building ",
"Aviso publicado en uno de tus favoritos.":"Report posted in one of your favourites.","Aviso publicado. Gracias por avisar.":"Report posted. Thank you.",
"Gracias. Incidencia confirmada.":"Thanks. Incident confirmed.","Gracias, respuesta registrada.":"Thanks, answer recorded.","Gracias. La incidencia se ha retirado del mapa.":"Thanks. The incident was removed from the map.",
"Quitado de favoritos.":"Removed from favourites.","Añadido a favoritos. Recibirás sus alertas.":"Added to favourites. You will get its alerts.","Añadido a favoritos.":"Added to favourites.",
"Tienes ":"You have "," alertas activas en tus edificios favoritos.":" active alerts in your favourite buildings."," edificios encontrados":" buildings found","Sin resultados":"No results",". Ficha abierta.":". Panel opened.",
"Nueva alerta en tu favorito ":"New alert in your favourite ","Aviso simulado en ":"Simulated report in ",". No es favorito, así que no genera alerta.":". Not a favourite, so no alert.",
"Aviso simulado de otro usuario.":"Simulated report from another user.","Consulta la señalización del edificio.":"Check the building signage.",
"Puerta O cerrada por obras.":"Gate O closed for roadworks.","Sigue por el carril peatonal hasta la puerta P.":"Follow the pedestrian lane to gate P.",
"Ascensor de la planta baja fuera de servicio.":"Ground-floor lift out of service.","Usa el ascensor de la entrada norte.":"Use the lift at the north entrance.",
"Rampa de acceso bloqueada por vallas.":"Access ramp blocked by fences.","Entra por la puerta lateral, sin escalones.":"Enter through the side door, no steps."};
const K=Object.keys(EN).sort((a,b)=>b.length-a.length);
U.tr=s=>{if(U.lang!=="en")return s;for(const k of K)if(s.includes(k))s=s.split(k).join(EN[k]);return s};
const SKIP="script,#alist,#favs,#sheet,#map,#locInfo,#type,#ls,#live";
function stat(){
  const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let n;
  while(n=w.nextNode()){if(n.parentElement.closest(SKIP))continue;if(n.__es===undefined)n.__es=n.nodeValue;const v=n.__es.trim();if(v)n.nodeValue=U.lang==="en"?n.__es.replace(v,U.tr(v)):n.__es}
  document.querySelectorAll("[placeholder],[aria-label],[title]").forEach(e=>["placeholder","aria-label","title"].forEach(a=>{
    if(!e.hasAttribute(a)||e.closest("#map"))return;const k="es_"+a;if(!e.dataset[k])e.dataset[k]=e.getAttribute(a);e.setAttribute(a,U.tr(e.dataset[k]))}));
  document.title=U.tr("Copiloto Accesible UPV");
}
U.setLang=l=>{U.lang=U.S.lang=l;U.save();document.documentElement.lang=l;stat();
  document.querySelectorAll("[data-lang]").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.lang===l)));
  U.draw();U.onLang&&U.onLang()};
document.addEventListener("click",e=>{const b=e.target.closest("[data-lang]");if(b&&b.dataset.lang!==U.lang){U.setLang(b.dataset.lang);U.say(U.L("Idioma: español","Language: English"))}});
})(window.UPV);
