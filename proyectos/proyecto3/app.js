const Productos = require("./colecciones/Productos");
const Producto = require("./modelos/Producto");
const TarjetaProducto = require("./vistas/TarjetaProducto");
const TablaProductos = require("./vistas/TablaProductos");
const EstadisticosProductos = require("./vistas/EstadisticosProductos");

// Creamos el modelo de producto Seleccionado
const productoSeleccionado = new Producto();

// Creamos la tarjeta para mostrar el producto seleccionado
new TarjetaProducto({
    model: productoSeleccionado
});

// Creamos la colección de productos
const productos = new Productos();

// Obtenemos los productos del servidor
productos.fetch();

// Creamos la tabla de productos
new TablaProductos({
    el: "#derecha",
    collection: productos,
    model: productoSeleccionado
});

new EstadisticosProductos({
    el: "#izquierda",
    collection: productos
});