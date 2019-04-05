const VistaMostrarFrutaSeleccionada = Backbone.View.extend({
    template: _.template(`
        <p>Fruta: <%= frutaSeleccionada %></p> 
    `),
    initialize() {
        this.$el.appendTo(document.body);
        this.listenTo(this.model, "change:frutaSeleccionada", this.render);
        this.render();
    },
    render() {
        this.$el.html(this.template(this.model.toJSON()));
    },
});