const VistaBotonActualizarImagen = Backbone.View.extend({
    template: _.template(`
        <button>actualizar</button>
    `),
    events: {
        "click button": "actualizarImagen"
    },
    initialize() {
        this.render();
    },
    render() {
        this.$el.html(this.template());
    },
    actualizarImagen() {
        this.model.set("url", this.model.get("temporalUrl"));
    }
});