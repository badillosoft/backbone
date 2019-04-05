const VistaSeleccionarFruta = Backbone.View.extend({
    template: _.template(`
        <select>
            <% for (let fruta of frutas) { %>
                <option><%= fruta %></option>
            <% } %>
        </select>
    `),
    events: {
        "change select": "seleccionarFruta",
    },
    initialize() {
        this.$el.appendTo(document.body);
        this.listenTo(this.model, "change:frutas", this.render);
        this.render();
    },
    render() {
        this.$el.html(this.template(this.model.toJSON()));
    },
    seleccionarFruta() {
        const nombre = this.$("select").val();
        this.model.seleccionarFruta(nombre);
    },
});