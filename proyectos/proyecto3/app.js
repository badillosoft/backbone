const Productos = require("./colecciones/Productos");
// const Producto = require("./modelos/Producto");
// const TarjetaProducto = require("./vistas/TarjetaProducto");
const TablaProductos = require("./vistas/TablaProductos");

const productos = new Productos();

productos.fetch();

const tablaProductos = new TablaProductos({
    collection: productos
});

document.body.appendChild(tablaProductos.el);