//----------------------------------------------------------------------------------------------//
// Array de colores
colores = [
    ['#239B56', '#186A3B', '#E4F8EC'], 
    ['#117A65', '#0B5345', '#E8F5F3'],
    ['#2874A6', '#1B4F72', '#D2E8F7'],
    ['#6C3483', '#4A235A', '#efe5f3']
];

//----------------------------------------------------------------------------------------------//
// Color activo
let colorActivo = 5;

//----------------------------------------------------------------------------------------------//
// Servidor base de datos
let urlServer = 'https://adminat.herokuapp.com';

//----------------------------------------------------------------------------------------------//
// Variables de la pantalla
let datosHeader = new Object;
datosHeader.leyenda = document.getElementById('headerTit');

let datosInicio = new Object;
datosInicio.pantallaActiva;
datosInicio.imgIniTot = document.getElementById('imgIniTot'); 
datosInicio.imgIniTab = document.getElementById('imgIniTab');
datosInicio.imgIniAlta = document.getElementById('imgIniAlta');
datosInicio.selCiclo = document.getElementById('selCiclo');

let datosBusqueda = new Object;
datosBusqueda.cont =  document.getElementById('contBusqueda');

let datosTot = new Object;
datosTot.cont =  document.getElementById('contTot');
datosTot.cantPed = document.getElementById('cantPed');
datosTot.totPag = document.getElementById('totPag');
datosTot.cuanGan = document.getElementById('cuanGan');
datosTot.totCob = document.getElementById('totCob');
datosTot.cuanPun = document.getElementById('cuanPun');
datosTot.cantProd = document.getElementById('cantProd');

let datosTabla  = new Object;
datosTabla.cont =  document.getElementById('contTablaScroll');
datosTabla.tabla = [];

let datosCarga  = new Object;
datosCarga.cont =  document.getElementById('contCarga');
datosCarga.img =  document.getElementById('imgCarga');

let datosAlta  = new Object;
datosAlta.cont =  document.getElementById('contAltaScroll');
datosAlta.cont2 =  document.getElementById('contAlta');
datosAlta.guardar =  document.getElementById('guardar');
