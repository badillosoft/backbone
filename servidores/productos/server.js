const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Servidor de Productos");
});

const productos = [
    {
        id: "coca-cola-600",
        nombre: "Coca-Cola 600ml",
        descripcion: "Refresco Coca-Cola de 600ml",
        precio: 12.5,
        costo: 6.0,
        existencias: 728,
        etiquetas: ["refresco", "coca-cola", "600ml"]
    },
    {
        id: "marias-10",
        nombre: "Galletas Marías 10pz",
        descripcion: "Galletas Marías de 10pz empaque dorado",
        precio: 8.5,
        costo: 7.0,
        existencias: 32,
        etiquetas: ["galleta", "gamesa"]
    },
    {
        id: "pepsi-600",
        nombre: "Pepsi 600ml",
        descripcion: "Refresco Pepsi de 600ml",
        precio: 11.5,
        costo: 6.5,
        existencias: 43,
        etiquetas: ["refresco", "pepsi", "600ml"]
    },
    {
        id: "gansito-mini",
        nombre: "Gansito Mini",
        descripcion: "Panque Gansito Mini",
        precio: 7.5,
        costo: 5.5,
        existencias: 20,
        etiquetas: ["pan", "marinela", "chocolate"]
    },
];

app.get("/productos", (req, res) => {
    res.send(productos);
});

app.post("/productos", (req, res) => {
    const producto = req.body;
    productos.push(producto);
    res.send(producto);
});

app.get("/productos/:id", (req, res) => {
    res.send(productos.filter(producto => {
        return producto.id === req.params.id;
    })[0]);
});

http.createServer(app).listen(4000, "10.0.18.33", () => {
    console.log("Servidor iniciado en http://10.0.18.33:4000/");
});