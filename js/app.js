let carrito;
const carritoLocalStorage = JSON.parse(localStorage.getItem('carrito') ) ?? [];  // optimizacion con operador avanzado


const contenedorProductos = document.getElementById("contenedorProductos");  // ésta variable global va a estar destinada al MAIN del html
const carritoContenedor = document.getElementById("carrito-contenedor");  // ésta variable global va a estar destinada al DIV que contiene los productos del carrito 

const terminarCompra = document.getElementById("fin-compra");

const contadorCarrito = document.getElementById("contadorCarrito");
const precioTotal = document.getElementById("precioTotal")

const seleccionarNumeroTalle = document.getElementById("seleccionarNumeroTalle");
const buscador = document.getElementById("buscar");


// este va a ser el filtro de talles para el calzado
seleccionarNumeroTalle.addEventListener("change", () => {
    if(seleccionarNumeroTalle.value == "todos"){
        mostrarProductos(stockCalzados)
    } else{
        let nuevoArray = stockCalzados.filter(elemento => elemento.numeroTalle === seleccionarNumeroTalle.value)
        console.log(nuevoArray)
        mostrarProductos(nuevoArray)
    }
})

const mostrarProductos = (array) => {
    contenedorProductos.innerHTML = ""

    array.forEach(elemento => {
        // creo una variable local con el nombre div. a esa variable DIV le voy a decir que acceda al documento y cree un elemento de tipo DIV. Luego, con div.className le voy a decir que a ese elemento DIV le agregue la clase "producto". Por último, al elemento DIV le voy a hacer un innerHTML para que me permita agregar a ese DIV la estructura que tiene adentro

        let div = document.createElement("div")
        div.className = "producto";
        div.innerHTML = ` 
                        <div class="card">
                            <div class="card-image">
                                <img src="${elemento.img}">
                                <div class="nombreProd"><span class="card-title">${elemento.nombre}</span></div>
                            </div>
                            <div class="card-content">
                                <p>${elemento.descripcion}</p>
                                <p>calzado: ${elemento.numeroTalle}</p>
                                <p>$${elemento.precio}</p>
                                <button id="boton${elemento.id}" type="button" class="btn btn-primary">Añadir al carro</button>
                            </div>
                        </div>
                        `
        // una vez creado el nodo, le voy a decir donde lo quiero agregar. En este caso, lo quiero agregar al main asique llamo a la variable global definida anteriormente. Voy a usar el método appendChild y le agrego el div. Al div que cree anteriormente, appendChild lo va a agregar como hijo del main contenedorProductos
        contenedorProductos.appendChild(div);

        let botonAgregar = document.getElementById(`boton${elemento.id}`)

        botonAgregar.addEventListener("click", () => {
            agregarAlCarrito(elemento.id);
        })

    })

}

const agregarAlCarrito = (id) => {
    // defino una variable local agregarProducto que va a guardar el producto que tengo que buscar, el cual está en mi stockCalzados. luego puedo usar la funcion de orden superior FIND que sirve para buscar. Le voy a pasar una funcion como parametro, en este caso llamada "producto" que va a ser la palabra que representa a cada objeto, y que despues se fije en cada uno de los objetos (producto) el id y que además vea si coincide el id que recibe por parametro 

    let agregarProd = stockCalzados.find(prod => prod.id === id);
    carrito.push(agregarProd);
    localStorage.setItem('carrito', JSON.stringify(carrito))
    mostrarCarrito(agregarProd);
    actualizarCarrito()

}

const mostrarCarrito = (agregarProd) => {
    // aplico la misma lógica que en la función de mostrarProductos

    let div = document.createElement("div")
    div.className = "productoEnCarrito";
    div.innerHTML = `
                    <p>${agregarProd.nombre}</p>
                    <p>precio: $${agregarProd.precio}</p>
                    <button id="eliminar${agregarProd.id}" type="button" class="btn btn-danger boton-eliminar">Eliminar</button>
                    `
    carritoContenedor.appendChild(div)

    let botonEliminar = document.getElementById(`eliminar${agregarProd.id}`)
    botonEliminar.addEventListener("click", () => {
        botonEliminar.parentElement.remove()
        carrito = carrito.filter(elemento => elemento.id !== agregarProd.id)
        actualizarCarrito()
    })
    
    // agrego un botón para finalizar la compra al cual le aplico la librería sweet alert 2
    let botonFinalizar = document.getElementById("finalizar")
    botonFinalizar.addEventListener("click", () => {
        Swal.fire(
            'Listo!',
            'Compra realizada con éxito',
            'success'
        )
    })
}

const actualizarCarrito = () => {
    // ahora al contador de mi carrito le voy a cambiar el valor, por eso uso innerText
    contadorCarrito.innerText = carrito.length
    precioTotal.innerText = carrito.reduce((acumulador, elemento)=> acumulador + elemento.precio, 0) //el método reduce recibe dos parámetros, una función (que también recibe dos parámetros, en este caso un acumulador y un elemento) donde el acumulador se sume por cada elemento con la propiedad precio, y por último un número
}

mostrarProductos(stockCalzados)


if (carritoLocalStorage){
    carrito = carritoLocalStorage

    mostrarCarrito()
    actualizarCarrito()
} else {
    carrito = []
}