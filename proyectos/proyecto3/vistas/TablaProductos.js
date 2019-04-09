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
        <style>
            tr {
                cursor: pointer;
            }
        </style>
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
        // Recuperar la fila (tr) seleccionada del evento
        const tr = event.currentTarget;
        // Recuperar su atributo id de usuario (data-id)
        const id = tr.dataset.id;
        console.log("Se seleccionó el producto", id);
        // Recuperar el producto de la colección mediante su id
        const producto = this.collection.get(id);
        // Copiamos los atributos del producto seleccionado en
        // el modelo de selección (this.model -> productoSeleccionado)
        this.model.set(producto.toJSON());
        // Nota: Agregamos un atributo falso para que piense
        // el modelo de selección que ha cambiado aunque
        // se trate del mismo modelo
        this.model.set("token", Math.random().toString(32).slice(2));
    }
});