const VistaCajaActualizarImagen = Backbone.View.extend({
    template: _.template(`
        <input type="url" >
    `),
    events: {
        "keyup input": "actualizarImagen"
    },
    initialize() {
        this.render();
    },
    render() {
        this.$el.html(this.template());
    },
    actualizarImagen(event) {
        this.model.set("temporalUrl", this.$("input").val());
        if (event.key === "Enter") {
            this.model.set("url", this.$("input").val());
        }
    }
});