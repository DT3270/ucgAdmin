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
datosInicio.pantalla;
datosInicio.selCiclo = document.getElementById('selCiclo');
datosInicio.cantPed = document.getElementById('cantPed');
datosInicio.totPag = document.getElementById('totPag');
datosInicio.cuanGan = document.getElementById('cuanGan');
datosInicio.totCob = document.getElementById('totCob');
datosInicio.cuanPun = document.getElementById('cuanPun');
datosInicio.cantProd = document.getElementById('cantProd');
datosInicio.tabla = [];
