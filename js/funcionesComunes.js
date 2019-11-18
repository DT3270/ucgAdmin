function asignarColor () {
    let color; 
    for (let flag = 0; flag==0 ; ) {
        color = Math.floor((Math.random() * 4) + 0)
        if (color != colorActivo) {
           flag = 1
           colorActivo = color
        };
    };

    let header = document.getElementsByClassName('header');
    let back = document.getElementsByClassName('back');
    let cont = document.getElementsByClassName('cont');
    let boton = document.getElementsByClassName('button');

    document.body.style.backgroundColor = colores[color][1];
    header[0].style.backgroundColor = colores[color][1];

    for (let index = 0; index < back.length; index++) {
        back[index].style.backgroundColor = colores[color][0];
    }
    for (let index = 0; index < cont.length; index++) {
        cont[index].style.backgroundColor = colores[color][2];
    }
    for (let index = 0; index < boton.length; index++) {
        boton[index].style.backgroundColor = colores[color][0];
    }

    // Botones de función
    datosInicio.imgIniTot.src = 'img/chart-pie-solid-' + colorActivo + '.png';
    datosInicio.imgIniTab.src = 'img/search-solid-' + colorActivo + '.png';
    datosInicio.imgIniAlta.src = 'img/cart-plus-solid-' + colorActivo + '.png';

};

function asginarPantalla (pantalla) {

    switch (pantalla) {
        case 'Totales':
            datosHeader.leyenda.value = 'ucg.estadisticas'
            datosTot.cont.style.display = 'block'
            datosTabla.cont.style.display = 'none'
            break;
        case 'Pedidos':
            datosHeader.leyenda.value = 'ucg.pedidos'
            datosTot.cont.style.display = 'none'
            datosTabla.cont.style.display = 'block'
            break;
        default:
            datosHeader.leyenda.value = 'ucg.nuevoPedido'
            datosTot.cont.style.display = 'none'
            datosTabla.cont.style.display = 'none'
            break;
    };

};