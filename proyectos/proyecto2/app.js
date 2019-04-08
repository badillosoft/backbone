const modeloImagen = new ModeloImagen();

const vistaImagen = new VistaImagen({
    model: modeloImagen
});

document.body.appendChild(vistaImagen.el);