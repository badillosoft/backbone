const Productos = require("./colecciones/Productos");
const Producto = require("./modelos/Producto");
const TarjetaProducto = require("./vistas/TarjetaProducto");
const TablaProductos = require("./vistas/TablaProductos");

const productos = new Productos({
});

productos.fetch().then(result => {
    console.log(result);

    console.log(productos.toArray());
});

const tablaProductos = new TablaProductos({
    collection: productos
});

document.body.appendChild(tablaProductos.el);