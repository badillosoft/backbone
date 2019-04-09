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
                        <td class="details-control"><%= producto.get("id") %></td>
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
        "click td a": "seleccionarFila",
    },
    initialize() {
        this.listenTo(this.collection, "update", this.render);
        this.render();
    },
    render() {
        this.$el.html(this.template({
            productos: this.collection.toArray()
        }));
        
        const table = this.$("table").DataTable();

        function format ( d ) {
            // `d` is the original data object for the row
            return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+
                '<tr>'+
                    '<td>Nombre:</td>'+
                    '<td>'+d[1]+'</td>'+
                '</tr>'+
                '<tr>'+
                    '<td>Existencias:</td>'+
                    '<td>'+d[2]+'</td>'+
                '</tr>'+
                '<tr>'+
                    '<td>Mostrar tarjeta</td>'+
                    '<td><a data-id="'+ d[0] +'">Ver tarjeta</a></td>'+
                '</tr>'+
            '</table>';
        }

        this.$("table").on('click', 'td.details-control', function () {
            var tr = $(this).closest('tr');
            var row = table.row( tr );
     
            if ( row.child.isShown() ) {
                // This row is already open - close it
                row.child.hide();
                tr.removeClass('shown');
            }
            else {
                // Open this row
                console.log(row.data());
                row.child( format( row.data() ) ).show();
                tr.addClass('shown');
            }
        } );

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