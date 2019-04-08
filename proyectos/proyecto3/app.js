const Productos = require("./colecciones/Productos");
const Producto = require("./modelos/Producto");
const TarjetaProducto = require("./vistas/TarjetaProducto");

const productos = new Productos();

productos.add(new Producto({
    id: "coca-cola-600",
    nombre: "Coca-Cola 600ml",
    descripcion: "Refresco Coca-Cola de 600ml",
    precio: 12.5,
    costo: 6.0,
    existencias: 728,
    etiquetas: ["refresco", "coca-cola", "600ml"]
}));
productos.add(new Producto({
    id: "marias-10",
    nombre: "Galletas Marías 10pz",
    descripcion: "Galletas Marías de 10pz empaque dorado",
    precio: 8.5,
    costo: 7.0,
    existencias: 32,
    etiquetas: ["galleta", "gamesa"]
}));
productos.add(new Producto({
    id: "pepsi-600",
    nombre: "Pepsi 600ml",
    descripcion: "Refresco Pepsi de 600ml",
    precio: 11.5,
    costo: 6.5,
    existencias: 43,
    etiquetas: ["refresco", "pepsi", "600ml"]
}));

