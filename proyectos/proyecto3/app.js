const Producto = require("./modelos/Producto");
const TarjetaProducto = require("./vistas/TarjetaProducto");

const producto = new Producto({
    id: "coca-cola-600",
    nombre: "Coca-Cola 600ml",
    descripcion: "Refresco Coca-Cola de 600ml",
    precio: 12.5,
    costo: 6.0,
    existencias: 728,
    etiquetas: ["refresco", "coca-cola", "600ml"]
});

console.log(producto);

const tarjetaProducto = new TarjetaProducto({
    model: producto
});

document.body.appendChild(tarjetaProducto.el);

setTimeout(() => {
    producto.set("existencias", 2);
}, 5000);