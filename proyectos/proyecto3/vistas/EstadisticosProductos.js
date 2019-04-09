module.exports = Backbone.View.extend({
    template: _.template(`
        <p>Total de productos: 1000</p>
        <ul>Etiquetas de productos:
            <li>REFRESCO: 100</li>
            <li>PAN: 23</li>
            <li>GALLETA: 55</li>
            <li>GAMESA: 19</li>
        </ul>
    `),
    initialize() {
        this.listenTo(this.collection, "update", this.render);
        this.render();
    },
    render() {
        this.$el.html(this.template());
        console.log("estadísticos");
    }
});