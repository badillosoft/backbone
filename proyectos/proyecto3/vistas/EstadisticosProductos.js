module.exports = Backbone.View.extend({
    template: _.template(`
        <style>
            li {
                margin-left: 20px;
            }
        </style>
        <p>Total de productos: <%= total %></p>
        <ul>Etiquetas de productos:
            <% for (let nombre in etiquetas) { %>
                <li><%= nombre.toUpperCase() %>: <%= etiquetas[nombre] %></li>
            <% } %>
        </ul>
    `),
    initialize() {
        this.listenTo(this.collection, "update", this.render);
        this.render();
    },
    render() {
        // this.collection.reduce(callback, reductor);
        // reductor -> {}
        // callback(reductor, item)
        // [1, 4, 5].reduce((s, x) => s + x, 0) -> 10
        const etiquetas = this.collection.reduce((etiquetas, producto) => {
            // for (let nombre of [Math.floor(10 * producto.get("precio") / 1000)]) {
            for (let nombre of [...new Set(producto.get("etiquetas"))]) {
                if (nombre in etiquetas) {
                    etiquetas[nombre] += 1;
                } else {
                    etiquetas[nombre] = 1;
                }
            }
            return etiquetas;
        }, {});

        for (let categoria in etiquetas) {
            let productos = this.collection.select(producto => {
                return producto.get("etiquetas").indexOf(categoria) >= 0;
            });

            let total = productos.length;
            let precioSuma = productos.reduce((suma, producto) => suma + producto.get("precio"), 0);
            let precioPromedio = precioSuma / total;
            let precioSuma2 = productos.reduce((suma, producto) => suma + (producto.get("precio") - precioPromedio) ** 2, 0);
            let precioVarianza = total <= 1 ? 0 : precioSuma2 / (total - 1);
            let precioDesviacion = precioVarianza ** 0.5;
            let precioMin = productos.reduce((min, producto) => producto.get("precio") < min ? producto.get("precio") : min, Infinity);
            let precioMax = productos.reduce((max, producto) => producto.get("precio") > max ? producto.get("precio") : max, -Infinity);
            let precioMin68 = precioPromedio - precioDesviacion;
            let precioMax68 = precioPromedio + precioDesviacion;
            let precioMin95 = precioPromedio - 2 * precioDesviacion;
            let precioMax95 = precioPromedio + 2 * precioDesviacion;
            let precioMin99 = precioPromedio - 3 * precioDesviacion;
            let precioMax99 = precioPromedio + 3 * precioDesviacion;

            let indicadores = {
                total: total,
                precio: {
                    suma: precioSuma,
                    suma2: precioSuma2,
                    promedio: precioPromedio,
                    varianza: precioVarianza,
                    desviacion: precioDesviacion,
                    min: precioMin,
                    max: precioMax,
                    min68: precioMin68,
                    max68: precioMax68,
                    min95: precioMin95,
                    max95: precioMax95,
                    min99: precioMin99,
                    max99: precioMax99,
                }
            }
            console.log(categoria, indicadores);
        }

        this.$el.html(this.template({
            total: this.collection.length,
            etiquetas: etiquetas
        }));
    }
});