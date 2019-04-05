const Canasta = Backbone.Model.extend({
    defaults: {
        frutaSeleccionada: null,
        frutas: []
    },
    agregarFruta(nombre) {
        const frutas = this.get("frutas").slice(); // [...]
        frutas.push(nombre); // [..., nombre]
        this.set("frutas", frutas); // { frutas: [..., nombre], ... }
    },
    seleccionarFruta(nombre) {
        this.set("frutaSeleccionada", nombre);
    }
});