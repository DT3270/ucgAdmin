function main() {

    // Comportamiento del combo
    datosInicio.selCiclo.addEventListener('change', function (e) {
        eliminarTabla();
        obtenerPedidos();  
    });

    // Activo pantalla     
    asginarPantalla("inicio");
    asignarColor();

    // Botones de función
    datosInicio.imgIniTot.src = 'img/chart-pie-solid-' + colorActivo + '.png';
    datosInicio.imgIniTab.src = 'img/search-solid-' + colorActivo + '.png';
    datosInicio.imgIniAlta.src = 'img/cart-plus-solid-' + colorActivo + '.png';

    // Defino tamaño pantalla
    var div = document.getElementsByClassName('contInicio')
    if (screen.width < 1024) {
        datosInicio.pantalla = "S"
        div[0].style.height = 160 + 'px';
    } else { 
        datosInicio.pantalla = "L"
        div[0].style.height = 100 + 'px';
    } // end-if 

    // Cargo pantalla de inicio    
    obtenerPedidos();

};

function obtenerPedidos() {
    // Bloqueo la pantalla
    // bloquear();
    // Consulta la base y deja la respuesta en la variabla json.
    var request = new XMLHttpRequest();
    var apiUrl = urlServer + "/pedidos";
    request.open("get", apiUrl, true);
    request.setRequestHeader("Content-Type", "application/json"); 
    request.send();
    request.onload = function () {
    //    desbloquear();  
        var json = JSON.parse(request.response);

        // Guardo la opción seleccionada
        var seleccion = datosInicio.selCiclo.value;

        // Recorro el json cargando el combo de ciclos.
        var ciclos = [];
        for (i=json.length-1;i>-1;i--){
            ciclos.push(json[i].ciclo)
        }; //end-for

        // Ordeno la lista de ciclos
        ciclos.sort();

        // Filtro por el ciclo seleccionado
        var listaCiclos = ciclos.filter(function(valor, indiceActual, arreglo) {
            var indiceAlBuscar = arreglo.indexOf(valor);
            if (indiceActual === indiceAlBuscar) {
                return true;
            } else {
                return false;
            }
        });

        // Cargo los ciclos
        datosInicio.selCiclo.length = 0;
        datosInicio.selCiclo.options[0] = new Option('Ciclo: Todos', 0, false, false);
        var j=1;
        for(var i=listaCiclos.length-1;i>-1;i--){ 
            datosInicio.selCiclo.options[j] = new Option('Ciclo: ' + listaCiclos[i], listaCiclos[i], false, false);
            j++
        }; //end-for

        datosInicio.selCiclo.value = seleccion

        // Recorro el json cargando la tabla.
        var tabla = [];
        var cantPed = 0;
        var totCob = 0;
        var cuanPun = 0;
        var cuanGan = 0;
        var totProd = 0;

        for (i=json.length-1;i>-1;i--){
            if (json[i].ciclo == selCiclo.value||selCiclo.value == 0) {
            
                var linea = [];

                linea.push(document.createTextNode('C' + json[i].ciclo));
                linea.push(document.createTextNode(json[i].cliente));
                linea.push(document.createTextNode(json[i].producto));
                linea.push(document.createTextNode(json[i].cantidad));
                linea.push(document.createTextNode('$' + json[i].precio.toFixed(2)));

                // Porcentaje de ganancia
                linea.push(document.createTextNode(json[i].porGanancia));

                if (json[i].paraMi == 's') {
                    var ganancia = 0;  
                    var totalACobrar = json[i].precio * json[i].cantidad - json[i].precio * json[i].porGanancia / 100; 
                } else {
                    var ganancia = (json[i].precio * json[i].cantidad) * json[i].porGanancia / 100 ;            
                    var totalACobrar = json[i].precio * json[i].cantidad; 
                }

                // Total a cobrar
                linea.push(document.createTextNode('$' + totalACobrar.toFixed(2)));

                // Total a pagar
                var totalAPagar = totalACobrar - ganancia; 
                linea.push(document.createTextNode('$' + totalAPagar.toFixed(2)));

                // Ganancia
                linea.push(document.createTextNode('$' + ganancia.toFixed(2)));

                var puntos = json[i].puntos * json[i].cantidad;
                linea.push(document.createTextNode(puntos));
                linea.push(document.createTextNode(json[i].notas));

                totProd = totProd + json[i].cantidad;
                totCob = totCob + json[i].precio * json[i].cantidad;
                cuanGan = cuanGan + ganancia;
                cuanPun = cuanPun + puntos;
                cantPed = cantPed + 1;

                var newImg = document.createElement('img');
                newImg.id = json[i]._id;
                newImg.src = 'img/minus-circle-solid.png';
                newImg.style.height = 20 + 'px';
                newImg.style.width = 20 + 'px';         
                newImg.addEventListener('click', function(e){
                    eliminarPedido(e.target.id);
                });
                linea.push(newImg);

                tabla.push(linea);
            }; //end-if
        }; //end-for

        datosInicio.tabla = tabla;
        var tit = ["Ciclo", "Cliente", "Producto", "Cantidad", "Precio Unitario", "%", "Total a Cobrar", "Total a Pagar", "Ganancia", "Puntos", "Notas", ""];

        crearTabla(tit, datosInicio.tabla);

        datosInicio.cantPed.textContent = cantPed;
        datosInicio.totPag.textContent = '$ ' + (totCob - cuanGan).toFixed(2);
        datosInicio.cuanGan.textContent = '$ ' + cuanGan.toFixed(2);
        datosInicio.totCob.textContent = '$ ' + totCob.toFixed(2);
        datosInicio.cuanPun.textContent = cuanPun;
        datosInicio.cantProd.textContent = totProd;
    }; // end-request
};

function eliminarPedido(id) {
    var request = new XMLHttpRequest();
    var apiUrl = urlServer + "/pedidos/" + id;
    request.open("delete", apiUrl, true);
    request.send();
    request.onload = function () {
        eliminarTabla();
        obtenerPedidos();
    }
};
