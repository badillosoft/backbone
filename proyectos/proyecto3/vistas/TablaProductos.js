module.exports = Backbone.View.extend({
    template: _.template(`
        <table class="display">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Precio</th>
                    <th>Costo</th>
                    <th>Existencias</th>
                </tr>
            </thead>
            <tbody>
                <% for (let producto of productos) { %>
                    <tr data-id="<%= producto.get("id") %>">
                        <td><%= producto.get("id") %></td>
                        <td><%= producto.get("nombre") %></td>
                        <td><%= producto.get("descripcion") %></td>
                        <td><%= producto.get("precio") %></td>
                        <td><%= producto.get("costo") %></td>
                        <td><%= producto.get("existencias") %></td>
                    </tr>
                <% } %>
            </tbody>
        </table>
    `),
    events: {
        "click tr": "seleccionarFila",
    },
    initialize() {
        this.listenTo(this.collection, "update", this.render);
        this.render();
    },
    render() {
        this.$el.html(this.template({
            productos: this.collection.toArray()
        }));
        this.$("table").DataTable();
    },
    seleccionarFila(event) {
        const tr = event.currentTarget;
        const id = tr.dataset.id;
        console.log("Se seleccionó el producto", id);
    }
});