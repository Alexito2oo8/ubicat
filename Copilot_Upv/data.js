// ===== PLANO DEL CAMPUS (basado en el "Plànol General" de la UPV) =====
const U=window.UPV=window.UPV||{};
// CALIBRACIÓN: convierte la posición en el plano (píxeles) a coordenadas reales.
// Si los edificios no encajan con las calles del mapa, ajusta estos 4 números:
// lat/lng = punto real del centro del plano · mpp = metros por píxel · rot = giro en grados
U.CAL={px:[1125,730],lat:39.4822,lng:-0.3432,mpp:0.9,rot:8};
U.g=(x,y)=>{const c=U.CAL,r=c.rot*Math.PI/180,dx=x-c.px[0],dy=y-c.px[1],
  E=c.mpp*(dx*Math.cos(r)-dy*Math.sin(r)),N=c.mpp*(-dx*Math.sin(r)-dy*Math.cos(r));
  return[c.lat+N/111320,c.lng+E/(111320*Math.cos(c.lat*Math.PI/180))]};
// Nombres conocidos [es, en]. Completa los que falten (código del edificio: [español, inglés]).
const NAMES={"3A":["Rectorado","Rectorate"],"1G":["ETSINF – Ingeniería Informática","ETSINF – Computer Science School"],"4D":["ETSIT – Ingeniería de Telecomunicación","ETSIT – Telecommunication Engineering"]};
const mk=(c,x,y,w,h,kind,es,ne)=>{const[lat,lng]=U.g(x,y);
  return{c,kind,es,ne,x,y,lat,lng,z:+c[0]||0,
   poly:kind?null:[[x-w/2,y-h/2],[x+w/2,y-h/2],[x+w/2,y+h/2],[x-w/2,y+h/2]].map(p=>U.g(p[0],p[1])),
   get n(){return U.lang==="en"?this.ne:this.es}}};
// Edificios: código x y [ancho alto] (posición en el plano)
U.B=("3M 757 428 230 120;3N 685 488;3P 675 594 80 100;3K 831 569;3F 677 667;3J 833 619;3I 785 619;3G 787 666;3H 835 663;3A 625 695;3B 736 722;3C 787 716;3D 840 722;2E 621 822;"+
"5O 883 427;5P 1019 429 150 50;5Q 1107 415 26 70;5L 945 530;5M 998 524;5N 1064 533;5J 896 571;5K 998 572;5I 992 621;5H 897 622;5G 999 666;5F 898 674;5S 1122 617 24 100;5B 894 723;5C 951 717;5D 999 721;5E 1069 720;"+
"1H 396 743;1G 494 742;1F 487 800 100 40;1B 412 890 130 120;1D 343 923;1A 364 953;1C 543 967;"+
"2F 757 850 110 100;2D 815 877;2B 733 920;2C 835 915;2A 835 968;2G 842 822;"+
"4M 896 823;4L 973 822;4K 1098 824;4H 901 866;4I 950 866;4Q 998 865;4J 1044 871;4E 901 915;4N 950 915;4F 997 915;4G 1070 916;4A 902 969;4P 975 968;4D 1066 996;"+
"6F 1180 899;6E 1229 941;6A 1197 985 90 70;6G 1413 917 130 50;6C 1379 997 60 70;6D 1469 997 60 70;"+
"7H 1190 420 70 60;7K 1449 462 150 34;7G 1372 537;7F 1370 593;7D 1367 655;7A 1366 713;7C 1174 611 24 100;7J 1466 528 90 40;7I 1464 592 90 50;7B 1458 713 90 50;"+
"9J 1580 513 40 18;9I 1580 531 40 18;9H 1578 548 40 18;9F 1600 568 40 18;9E 1566 606;9D 1560 687;9A 1659 726 120 30;9B 1789 733 110 30;9C 1913 733 110 30;"+
"8L 1571 768;8H 1578 821;8K 1639 820;8N 1562 876;8F 1560 909;8J 1654 904;8P 1754 925;8I 1633 963;8D 1555 940;8C 1553 972;8A 1553 1004;8G 1918 811 90 100;8E 1910 893 90 80;8B 1902 970 100 80")
 .split(";").map(s=>{const[c,x,y,w=54,h=34]=s.split(" ").map((v,i)=>i?+v:v),nm=NAMES[c];
  return mk(c,x,y,w,h,null,nm?nm[0]:"Edificio "+c,nm?nm[1]:"Building "+c)});
// Puertas de acceso del plano (letras A–S)
U.G="A 405 684;B 519 417;C 836 390;D 937 392;E 1106 469;F 1175 527;G 1323 505;H 1555 508;I 1976 771;J 1931 1024;K 1527 1028;L 1346 1025;M 1152 1024;N 1010 1024;O 790 1028;P 613 1029;R 430 1028;S 268 880"
 .split(";").map(s=>{const[c,x,y]=s.split(" ");return mk(c,+x,+y,0,0,"gate","Puerta "+c,"Gate "+c)});
// Estaciones de metro
U.M=[["Universitat Politècnica",440,1062],["La Carrasca",905,1060],["Tarongers",1390,1058],["Serrería",1930,1062]].map(([n,x,y],i)=>mk("m"+i,x,y,0,0,"metro","Metro "+n,"Metro "+n));
U.ALL=U.B.concat(U.G);
U.T={asc:["🛗","Ascensor averiado"],cierre:["⛔","Acceso cerrado"],rampa:["♿","Rampa bloqueada"],obra:["🚧","Obras"],otro:["⚠️","Otra incidencia"]};
