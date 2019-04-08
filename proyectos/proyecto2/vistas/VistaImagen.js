const VistaImagen = Backbone.View.extend({
    // Versión sin underscore
    // template: "<img src='http://placehold.it/200' >",
    // Versión underscore
    template: _.template(`
        <img src='<%= url %>' >
    `),
    initialize() {
        this.listenTo(this.model, "change:url", this.render);
        this.render()
    },
    render() {
        // this.$el.html(this.template);
        // this.$("img").attr("src", this.model.get("url"));
        
        // Versión underscore
        this.$el.html(this.template({
            url: this.model.get("url")
        }));
    }
});