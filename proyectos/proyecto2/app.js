const modeloImagen = new ModeloImagen();

const vistaCajaActualizarImagen = new VistaCajaActualizarImagen({
    model: modeloImagen
});

const vistaBotonActualizarImagen = new VistaBotonActualizarImagen({
    model: modeloImagen
});

const vistaImagen = new VistaImagen({
    model: modeloImagen
});

document.body.appendChild(vistaCajaActualizarImagen.el);
document.body.appendChild(vistaBotonActualizarImagen.el);
document.body.appendChild(vistaImagen.el);

// Clone

const modeloImagenClone = new ModeloImagen();

const vistaCajaActualizarImagenClone = new VistaCajaActualizarImagen({
    model: modeloImagen
});

const vistaBotonActualizarImagenClone = new VistaBotonActualizarImagen({
    model: modeloImagen
});

const vistaImagenClone = new VistaImagen({
    model: modeloImagen
});

document.body.appendChild(vistaCajaActualizarImagenClone.el);
document.body.appendChild(vistaBotonActualizarImagenClone.el);
document.body.appendChild(vistaImagenClone.el);