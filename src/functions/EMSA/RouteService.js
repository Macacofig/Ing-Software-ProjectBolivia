function registrarRuta(nombre, zona, listaRutas) {
  const nuevasRutas = [...listaRutas, { nombre: nombre, zona: zona }];

  return { 
    exito: true, 
    mensaje: "Ruta registrada exitosamente.",
    rutas: nuevasRutas 
  };
}

export { registrarRuta };