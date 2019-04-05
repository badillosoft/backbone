const canasta1 = new Canasta({
    frutas: ["manzana", "pera", "kiwi"],
    frutaSeleccionada: "manzana"
});

const vistaSeleccionarFruta1 = new VistaSeleccionarFruta({
    model: canasta1
});

const vistaMostrarFrutaSeleccionada1 = new VistaMostrarFrutaSeleccionada({
    model: canasta1
});

const vistaMostrarFrutaSeleccionada2 = new VistaMostrarFrutaSeleccionada({
    model: canasta1
});

const vistaAgregarFruta1 = new VistaAgregarFruta({
    model: canasta1
});