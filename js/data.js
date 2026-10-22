// ===== DATOS DEL CAMPUS (coordenadas APROXIMADAS: ajústalas aquí) =====
window.UPV=window.UPV||{};
UPV.CENTER=[39.4824,-0.3440];
UPV.BOUNDS=[[39.4775,-0.3520],[39.4870,-0.3340]]; // límites del mapa: solo el campus
// [código, nombre, latitud, longitud, descripción]
UPV.B=[
["1","ETSINF – Ingeniería Informática",39.4826,-0.3437,"Aulas, laboratorios y secretaría de Informática."],
["4D","ETSIT – Ingeniería de Telecomunicación",39.4836,-0.3452,"Aulas y laboratorios de Telecomunicación."],
["3A","Rectorado",39.4818,-0.3418,"Servicios centrales y administración."],
["4N","Biblioteca General",39.4822,-0.3448,"Biblioteca con salas de estudio y préstamo."],
["5J","ETSID – Ingeniería del Diseño",39.4813,-0.3458,"Aulas y talleres de Diseño Industrial."],
["ÁG","Ágora",39.4820,-0.3466,"Espacio de actos y exposiciones."],
["4E","ETSICCP – Caminos, Canales y Puertos",39.4832,-0.3425,"Aulas y laboratorios de Ingeniería Civil."],
["7B","ETSIE – Ingeniería de Edificación",39.4806,-0.3432,"Aulas y talleres de Edificación."],
["8E","ETSIAMN – Agronómica y del Medio Natural",39.4842,-0.3405,"Aulas, laboratorios e invernaderos."],
["9C","Facultad de Bellas Artes",39.4798,-0.3410,"Talleres y aulas de arte."],
["6G","Facultad de ADE",39.4827,-0.3410,"Aulas de Administración y Dirección de Empresas."]
].map(([c,n,lat,lng,d])=>({c,n,lat,lng,d}));
// icono, nombre del aviso
UPV.T={asc:["🛗","Ascensor averiado"],cierre:["⛔","Acceso cerrado"],rampa:["♿","Rampa bloqueada"],obra:["🚧","Obras"],otro:["⚠️","Otra incidencia"]};
