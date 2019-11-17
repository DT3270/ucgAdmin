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
    let footer = document.getElementsByClassName('footer');

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

    footer[0].style.backgroundColor = colores[color][1];

};

function asginarPantalla (pantalla) {

    switch (pantalla) {
        case 'inicio':
            datosHeader.leyenda.value = 'ucg.administrarPedidos'
            break;
        default:
            console.log(pantalla)
            break;
    };

};