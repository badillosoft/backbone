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
            for (let nombre of producto.get("etiquetas")) {
                if (nombre in etiquetas) {
                    etiquetas[nombre] += 1;
                } else {
                    etiquetas[nombre] = 1;
                }
            }
            return etiquetas;
        }, {});

        this.$el.html(this.template({
            total: this.collection.length,
            etiquetas: etiquetas
        }));
    }
});