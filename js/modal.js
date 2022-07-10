const abrirCarrito = document.getElementById("botonCarrito")
const cerrarCarrito = document.getElementById("carritoCerrar")

const contenedorModal = document.getElementsByClassName("contenedor-modal")[0]
const modalCarrito = document.getElementsByClassName("carrito-modal")[0]

abrirCarrito.addEventListener("click", () => {
    contenedorModal.classList.toggle("modal-active")
})

cerrarCarrito.addEventListener("click", () => {
    contenedorModal.classList.toggle("modal-active");
})

modalCarrito.addEventListener("click", (evento) => {
    evento.stopPropagation()
})

contenedorModal.addEventListener("click", () => {
    cerrarCarrito.click()
})