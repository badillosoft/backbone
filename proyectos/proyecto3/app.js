const Productos = require("./colecciones/Productos");
const Producto = require("./modelos/Producto");
const TarjetaProducto = require("./vistas/TarjetaProducto");
const TablaProductos = require("./vistas/TablaProductos");

// Creamos el modelo de producto Seleccionado
const productoSeleccionado = new Producto();

// Creamos la tarjeta para mostrar el producto seleccionado
const tarjetaProductoSeleccionado = new TarjetaProducto({
    model: productoSeleccionado
});

// Creamos la colección de productos
const productos = new Productos();

// Obtenemos los productos del servidor
productos.fetch();

// Creamos la tabla de productos
const tablaProductos = new TablaProductos({
    collection: productos,
    model: productoSeleccionado
});

// Montamos la tabla de productos en el body
document.body.appendChild(tablaProductos.el);