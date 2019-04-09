module.exports = Backbone.View.extend({
    template: _.template(`
    <div class="modal is-active">
            <div class="modal-background"></div>
            <div class="modal-content">
                <!-- Any other Bulma elements you want -->
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title">
                            <%= nombre %> (<%= existencias %>)
                        </p>
                        <a href="#" class="card-header-icon" aria-label="more options">
                            <span class="icon">
                            <i class="fas fa-carrot" aria-hidden="true"></i>
                            </span>
                        </a>
                    </header>
                    <div class="card-content">
                    <div class="content">
                        <%= descripcion %>
                    </div>
                    </div>
                    <footer class="card-footer">
                        <div class="tags are-medium" style="padding: 10px">
                            <% for (let etiqueta of etiquetas) { %>
                                <span class="tag <%= existencias < 10 ? 'is-danger' : 'is-success' %>">
                                    <%= etiqueta %>
                                </span>
                            <% } %>
                        </div>
                    </footer>
                </div>
            </div>
            <button class="modal-close is-large" aria-label="close"></button>
        </div>
    `),
    events: {
        "click .modal-close": "cerrar"
    },
    initialize() {
        this.listenTo(this.model, "change", this.render);
        document.body.appendChild(this.el);
        // this.render();
    },
    render() {
        this.$el.html(this.template(
            this.model.toJSON()
        ));
        // Mostramos el producto
        this.$el.show();
    },
    cerrar() {
        // Ocultamos el producto
        this.$el.hide();
    }
});