const VistaAgregarFruta = Backbone.View.extend({
    template: _.template(`
        <input placeholder="Agrega una fruta (pulsa enter)">
    `),
    events: {
        "keyup input": "agregarFruta",
    },
    initialize() {
        this.$el.appendTo(document.body);
        this.render();
    },
    render() {
        this.$el.html(this.template(this.model.toJSON()));
    },
    agregarFruta(e) {
        if (e.key === "Enter") {
            const nombre = this.$("input").val();
            this.model.agregarFruta(nombre);
            this.$("input").val("");
        }
    }
});