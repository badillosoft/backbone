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
        <ul>Estadísticos por producto:
            <% for (let nombre in etiquetas) { %>
                <li><%= nombre.toUpperCase() %>:
                    <p>Diferencia Precio-Costo: <%= estadisticos[nombre].diferenciaPrecioCosto.toFixed(1) %></p>
                    <p>Correlación Precio-Costo: <%= estadisticos[nombre].correlacionPrecioCosto.toFixed(1) %></p>
                    <!--<ul>Precio:
                        <% for (let key in estadisticos[nombre].precio) { %>
                            <li><%= key.toUpperCase() %>: <%= estadisticos[nombre].precio[key].toFixed(1) %></li>
                        <% } %>
                    </ul>
                    <ul>Costo:
                        <% for (let key in estadisticos[nombre].costo) { %>
                            <li><%= key.toUpperCase() %>: <%= estadisticos[nombre].costo[key].toFixed(1) %></li>
                        <% } %>
                    </ul>-->
                </li>
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
            // for (let nombre of [Math.floor(10 * producto.get(nombre) / 1000)]) {
            for (let nombre of [...new Set(producto.get("etiquetas"))]) {
                if (nombre in etiquetas) {
                    etiquetas[nombre] += 1;
                } else {
                    etiquetas[nombre] = 1;
                }
            }
            return etiquetas;
        }, {});

        const estadisticos = {};

        for (let categoria in etiquetas) {
            let productos = this.collection.select(producto => {
                return producto.get("etiquetas").indexOf(categoria) >= 0;
            });

            let total = productos.length;

            function estadisticosEscales(nombre) {
                let suma = productos.reduce((suma, producto) => suma + producto.get(nombre), 0);
                let suma2s = productos.reduce((suma, producto) => suma + producto.get(nombre) ** 2, 0);
                let promedio = suma / total;
                let suma2 = productos.reduce((suma, producto) => suma + (producto.get(nombre) - promedio) ** 2, 0);
                let varianza = total <= 1 ? 0 : suma2 / (total - 1);
                let desviacion = varianza ** 0.5;
                let min = productos.reduce((min, producto) => producto.get(nombre) < min ? producto.get(nombre) : min, Infinity);
                let max = productos.reduce((max, producto) => producto.get(nombre) > max ? producto.get(nombre) : max, -Infinity);
                let min68 = promedio - desviacion;
                let max68 = promedio + desviacion;
                let min95 = promedio - 2 * desviacion;
                let max95 = promedio + 2 * desviacion;
                let min99 = promedio - 3 * desviacion;
                let max99 = promedio + 3 * desviacion;

                return { suma, promedio, suma2, suma2s, varianza, desviacion, min, max, min68, max68, min95, max95, min99, max99 };
            }

            function pearson(x, y) {
                let sxy = productos.reduce((suma, producto) => suma + producto.get(x) * producto.get(y), 0);
                let ex = estadisticosEscales(x);
                let ey = estadisticosEscales(y);
                let sx = ex.suma;
                let sy = ey.suma;
                let s2x = ex.suma2s;
                let s2y = ey.suma2s;
                let px = ex.promedio;
                let py = ey.promedio;
                let dx = (total * s2x - sx ** 2) ** 0.5;
                let dy = (total * s2y - sy ** 2) ** 0.5;

                return (sxy - total * px * py) / (dx * dy);
            }


            let indicadores = {
                total: total,
                precio: estadisticosEscales("precio"),
                costo: estadisticosEscales("costo"),
                existencias: estadisticosEscales("existencias"),
            }

            indicadores.diferenciaPrecioCosto = indicadores.precio.promedio - indicadores.costo.promedio;
            indicadores.correlacionPrecioCosto = pearson("precio", "costo");

            console.log(categoria, indicadores);

            estadisticos[categoria] = indicadores;
        }

        this.$el.html(this.template({
            total: this.collection.length,
            etiquetas: etiquetas,
            estadisticos
        }));

        if (this.model) {
            this.model.set({
                etiquetas: etiquetas,
                estadisticos:estadisticos,
            });
        }
    }
});