module.exports = Backbone.View.extend({
    template: _.template(`
        <style>
            tr {
                cursor: pointer;
            }
            tr.suficiente {
                color: green;
            }
            tr.riesgo {
                color: orange;
            }
            tr.insuficiente {
                color: red;
            }
            tr.agotado {
                color: purple;
            }
            td.details-control {
                background: url('https://cdn.rawgit.com/DataTables/DataTables/6c7ada53ebc228ea9bc28b1b216e793b1825d188/examples/resources/details_open.png') no-repeat center center;
                cursor: pointer;
            }
            tr.shown td.details-control {
                background: url('https://cdn.rawgit.com/DataTables/DataTables/6c7ada53ebc228ea9bc28b1b216e793b1825d188/examples/resources/details_close.png') no-repeat center center;
            }
        </style>
        <table class="display" style="width: 100%"></table>
    `),
    events: {
        "click .seleccionar-fila": "seleccionarFila",
    },
    initialize() {
        this.listenTo(this.collection, "update", this.render);
        this.render();
    },
    render() {
        // Compilamos la plantilla
        this.$el.html(this.template());

        // Creamos la tabla y definimos el contenido de la tabla
        // a partir de los datos de la colección
        const table = this.$("table").DataTable({
            scrollX: true,
            data: this.collection.toArray().map(producto => {
                return producto.toJSON();
            }).map(producto => {
                producto.estatusExistencias = "Suficiente";
                if (producto.existencias === 0) {
                    producto.estatusExistencias = "Agotado";
                } else if (producto.existencias < 10) {
                    producto.estatusExistencias = "Insuficiente";
                } else if (producto.existencias < 100) {
                    producto.estatusExistencias = "Riesgo";
                } 
                return producto;
            }),
            columns: [
                {
                    "className": 'details-control',
                    "title": "Detalles",
                    "orderable": false,
                    "data": null,
                    "defaultContent": ''
                },
                {
                    title: "Id",
                    data: "id"
                },
                {
                    title: "Nombre",
                    data: "nombre"
                },
                {
                    title: "Precio",
                    data: "precio"
                },
                {
                    title: "Costo",
                    data: "costo"
                },
                {
                    title: "Existencias",
                    data: "existencias"
                },
                {
                    title: "Estatus Existencias",
                    data: "estatusExistencias"
                },
            ]
        });

        // Definimos el formato para los campos ocultos
        function format ( producto ) {
            return  `
                <table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">
                    <tr>
                        <td>Descripción:</td>
                        <td>${producto.descripcion}</td>
                    </tr>
                    <tr>
                        <td>Mostrar tarjeta</td>
                        <td><a class="seleccionar-fila" data-id="${producto.id}">Ver tarjeta</a></td>
                    </tr>
                </table>
            `;
        }

        // Se pintan los datos ocultos al darle click a la columna de detalles
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

        table.rows().iterator('row', function(context, index){
            const tr = table.row(index).node();
            const producto = table.row(index).data();
            
            $(tr).addClass(producto.estatusExistencias.toLowerCase());
        });

    },
    seleccionarFila(event) {
        // Recuperar la fila (.seleccionar-fila) seleccionada del evento
        const target = event.currentTarget;
        // Recuperar su atributo id de usuario (data-id)
        const id = target.dataset.id;
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