function main() {

    // Creo la pantalla de alta (agregado de campos para el alta de un pedido)
    crearPantallaAlta();

    // Agrego el campo buscar a la pantalla de pedidos
    crearPantallaPedidos();

    // Seteo comportamiento de pantalla
    comportamientoPantalla();

    // Activo pantalla     
    datosInicio.pantallaActiva = "Totales"
    asginarPantalla(datosInicio.pantallaActiva);
    asignarColor();

    // Cargo pantalla de inicio    
    obtenerPedidos();

};

function dimensionarPantalla() {
    // Uso JQuery para obtener height porque es lo unico que me anda en android
    let headHeight = $(window).height() * 9 / 100;
            
    // Varío el tamaño de la imagen de la cabecera en función del tamaño de la pantalla
    var headerImg = document.getElementsByClassName('headerImg');
    for (let i = 0; i < headerImg.length; i++) {
        headerImg[i].style.height = headHeight - 8 + "px";
        headerImg[i].style.width = headHeight - 8 + "px";
        headerImg[i].style.margin = 4 + "px";
    };

    // Varío el tamaño del texto de la cabecera en función del tamaño de la pantalla
    var headerTit = document.getElementsByClassName('headerTit');
    for (let i = 0; i < headerTit.length; i++) {
        switch (true) {
            case (headHeight > 40):
                headerTit[i].style.fontSize = 22 + "px";              
                break;    
            case (headHeight > 30):
                headerTit[i].style.fontSize = 12 + "px";            
                break;    
            case (headHeight > 20):
                headerTit[i].style.fontSize = 8 + "px";            
                break;    
            default:
                headerTit[i].style.fontSize = 5 + "px";            
                break;
        }
        headerTit[i].style.top = headHeight / 2 - headerTit[i].clientHeight / 2 + "px";
    };

    // Defino si muestro o no la cabecera en función del tamaño de la pantalla (me falta extender el fondo)
    var header = document.getElementsByClassName('header');
    for (let i = 0; i < header.length; i++) {
        switch (true) {
            case (headHeight > 40):
                header[i].style.display = "block";
                break;    
            case (headHeight > 30):
                header[i].style.display = "block";            
                break;    
            case (headHeight > 20):
                header[i].style.display = "block";            
                break;    
            default:
                header[i].style.display = "none";            
                break;
        }
    };

    // Cargo nuevamente la tabla en pantalla
    eliminarTabla();
    var tit = ["Ciclo", "Cliente", "Producto", "Cantidad", "Precio Unitario", "%", "Total a Cobrar", "Total a Pagar", "Ganancia", "Puntos", "Notas", ""];
    crearTabla(tit, datosTabla.tabla);
    // Aplico la búsqueda si el campo tiene información
    let buscar = document.getElementById('Buscar');
    if (buscar.value) {
        $('#tabla').DataTable().search(buscar.value).draw();        
    }
};

function comportamientoPantalla() {
     
    // Comportamiento del combo
    datosInicio.selCiclo.addEventListener('change', function (e) {
        eliminarTabla();
        obtenerPedidos();  
    });

    // Comportamiento de botones de menú
    datosInicio.imgIniTot.addEventListener('click', function (e) {
        datosInicio.pantallaActiva = "Totales"
        asginarPantalla(datosInicio.pantallaActiva);
        asignarColor();
    });

    datosInicio.imgIniTab.addEventListener('click', function (e) {
        datosInicio.pantallaActiva = "Pedidos"
        eliminarTabla();
        obtenerPedidos();
        asginarPantalla(datosInicio.pantallaActiva);
        asignarColor();
    });

    datosInicio.imgIniAlta.addEventListener('click', function (e) {
        datosInicio.pantallaActiva = "Alta"
        asginarPantalla(datosInicio.pantallaActiva);
        asignarColor();
    });

    // Comportamiento pantalla de alta
    document.getElementById('Ciclo').addEventListener('keypress', function (e) {
        var key = e.which || e.keyCode;
        if (key === 13) { // 13 is enter
        document.getElementById('Cliente').focus();
        }
    });

    document.getElementById('Cliente').addEventListener('keypress', function (e) {
        var key = e.which || e.keyCode;
        if (key === 13) { // 13 is enter
            document.getElementById('Producto').focus();
        }
    });

    document.getElementById('Producto').addEventListener('keypress', function (e) {
        var key = e.which || e.keyCode;
        if (key === 13) { // 13 is enter
            document.getElementById('Precio').focus();
        }
    });

    document.getElementById('Precio').addEventListener('keypress', function (e) {
        var key = e.which || e.keyCode;
        if (key === 13) { // 13 is enter
            document.getElementById('% de ganancia').focus();
        }
    });

    document.getElementById('% de ganancia').addEventListener('keypress', function (e) {
        var key = e.which || e.keyCode;
        if (key === 13) { // 13 is enter
            document.getElementById('Cantidad').focus();
        }
    });

    document.getElementById('Cantidad').addEventListener('keypress', function (e) {
        var key = e.which || e.keyCode;
        if (key === 13) { // 13 is enter
            document.getElementById('Puntos').focus();
        }
    });

    document.getElementById('Puntos').addEventListener('keypress', function (e) {
        var key = e.which || e.keyCode;
        if (key === 13) { // 13 is enter
            document.getElementById('Notas').focus();
        }
    }); 

    document.getElementById('Notas').addEventListener('keypress', function (e) {
        var key = e.which || e.keyCode;
        if (key === 13) { // 13 is enter
            document.getElementById('Ciclo').focus();
            guardarPedido();
        }
    });    
};

function guardarPedido() {
    
    var ciclo = document.getElementById('Ciclo');
    var cliente = document.getElementById('Cliente');
    var producto = document.getElementById('Producto');
    var cantidad = document.getElementById('Cantidad');
    var precio = document.getElementById('Precio');
    var porGanancia = document.getElementById('% de ganancia');
    var puntos = document.getElementById('Puntos');
    var notas = document.getElementById('Notas');
    var paraMi = document.getElementById('check1');
    // Create a request variable and assign a new XMLHttpRequest object to it.
    var request = new XMLHttpRequest();
    var apiUrl = urlServer + "/pedidos";

    var miPedido = new Object(); 
    miPedido.ciclo = ciclo.value;
    miPedido.cliente = cliente.value;
    miPedido.producto = producto.value;
    miPedido.cantidad = cantidad.value;
    miPedido.precio = precio.value;    
    miPedido.porGanancia = porGanancia.value;
    miPedido.paraMi = paraMi.value;
    miPedido.puntos = puntos.value;
    miPedido.notas = notas.value;

    let inputs = this.document.getElementsByClassName('myInput');
    for (let i = 0; i < inputs.length; i++) {
        if(inputs[i].value.length>=1) {
            inputs[i].nextElementSibling.classList.add('fijar');
        } else {
            inputs[i].nextElementSibling.classList.remove('fijar');
        };
    };

    var miString = JSON.stringify(miPedido);
    request.open("post", apiUrl, true);
    request.setRequestHeader("Content-Type", "application/json"); 
    request.send(miString);
    request.onload = function () {
        if (request.status==200) {
            alert("Alta efectuada")
            ciclo.value = "";
            cliente.value = "";
            producto.value = "";
            precio.value = "";
            porGanancia.value = "";
            paraMi.value = "n";
            paraMi.src = 'img/circle-regular2.png';
            cantidad.value = "";
            puntos.value = "";
            notas.value = "";        
            eliminarTabla()
            obtenerPedidos()                
        } else {
            var obj = JSON.parse(request.response)
            alert("Alta no efectuada. Mensaje: " + obj.message)
        }
    };
};  

function crearPantallaAlta() {

    let inputs = this.document.getElementsByClassName('myInput');
    for (let i = 0; i < inputs.length; i++) {
        if(inputs[i].value.length>=1) {
            inputs[i].nextElementSibling.classList.add('fijar');
        } else {
            inputs[i].nextElementSibling.classList.remove('fijar');
        };
    };

    const ciclo = new Campo('Ciclo', 'text');
    ciclo.agregar(datosAlta.cont2, 'i', 'Ingresa el ciclo del pedido');
    const cliente = new Campo('Cliente', 'text');
    cliente.agregar(datosAlta.cont2, 'i', 'Ingresa el cliente para el cual es el pedido');
    const producto = new Campo('Producto', 'number');
    producto.agregar(datosAlta.cont2, 'i', 'Ingresa el número de producto del catalogo');
    const precio = new Campo('Precio', 'number');
    precio.agregar(datosAlta.cont2, 'i', 'Ingresa el precio del producto según el catalogo');
    const porGanancia = new Campo('% de ganancia', 'number');
    porGanancia.agregar(datosAlta.cont2, 'i', 'Ingresa el porcentaje de ganancia que te daría el pedido');

    var newDiv = document.createElement('div');
    newDiv.style.height = 30 + 'px';
    newDiv.style.marginTop = 5 + 'px';
    newDiv.style.marginBottom = 10 + 'px';
    newDiv.style.position = 'relative';
    
    var newImg = document.createElement('img');
    newImg.id = 'check1';
    newImg.src = 'img/circle-regular2.png';
    newImg.style.height = 24 + 'px';
    newImg.style.width = 24 + 'px';
    newImg.style.margin = 5 + 'px';
    newImg.style.cssFloat	= 'left';
    newImg.value = 'n';
    newDiv.addEventListener('click', function(){
        if (newImg.value == 's') {
            newImg.value = 'n'
            newImg.src = 'img/circle-regular2.png';
        } else {
            newImg.value = 's'
            newImg.src = 'img/check-circle-solid2.png';
        }	
    });                    

    newDiv.appendChild(newImg);			
    var newP = document.createElement('p');
    newP.style.position = 'relative';
    newP.style.top = 6 + 'px';
    newP.style.left = 12 + 'px';
    newP.textContent = 'Es para mi!';
    newDiv.appendChild(newP);			
    datosAlta.cont2.appendChild(newDiv);			

    const cantidad = new Campo('Cantidad', 'number');
    cantidad.agregar(datosAlta.cont2);
    const puntos = new Campo('Puntos', 'number');
    puntos.agregar(datosAlta.cont2, 'i', 'La cantidad de puntos que te da el pedido (por unidad)');
    const notas = new Campo('Notas', 'text');
    notas.agregar(datosAlta.cont2, 'i', 'Una nota que te sea ultil (por ejemplo para identificar el producto)');

    var newButton = document.createElement('button');
    newButton.id = "guardar";
    newButton.className = "button button1";
    newButton.onclick = "guardarPedido();";
    newButton.style.marginTop = 10 + "px";
    newButton.textContent = "GUARDAR";
    newButton.addEventListener('click', function(){
        guardarPedido()
    });                    
    datosAlta.cont2.appendChild(newButton);
};

function crearPantallaPedidos() {

    const buscar = new Campo('Buscar', 'text');
    buscar.agregar(datosBusqueda.cont, '', '');

};

function obtenerPedidos() {
    // Bloqueo la pantalla
    asginarPantalla("Carga");
    // Consulta la base y deja la respuesta en la variabla json.
    var request = new XMLHttpRequest();
    var apiUrl = urlServer + "/pedidos";
    request.open("get", apiUrl, true);
    request.setRequestHeader("Content-Type", "application/json"); 
    request.send();
    request.onload = function () {
        asginarPantalla(datosInicio.pantallaActiva);
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

        // Cargo la tabla con la información de los ciclos de la base
        datosTabla.tabla = cargarTabla(json);
        // Dimensionar pantalla
        dimensionarPantalla();

//      var tit = ["Ciclo", "Cliente", "Producto", "Cantidad", "Precio Unitario", "%", "Total a Cobrar", "Total a Pagar", "Ganancia", "Puntos", "Notas", ""];
//      crearTabla(tit, datosTabla.tabla);

    }; // end-request
};

function cargarTabla(json) {3

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

    datosTot.cantPed.textContent = cantPed;
    datosTot.totPag.textContent = '$ ' + (totCob - cuanGan).toFixed(2);
    datosTot.cuanGan.textContent = '$ ' + cuanGan.toFixed(2);
    datosTot.totCob.textContent = '$ ' + totCob.toFixed(2);
    datosTot.cuanPun.textContent = cuanPun;
    datosTot.cantProd.textContent = totProd;

    return tabla;
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
