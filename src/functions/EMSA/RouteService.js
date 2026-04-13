function registrarRuta(nombre, zona, listaRutas) {
  if (nombre === "" || zona === "") {
    return { exito: false, mensaje: "Error: Faltan datos.", rutas: listaRutas };
  }

  const existeDuplicado = listaRutas.some(
    (ruta) => ruta.nombre === nombre && ruta.zona === zona
  );

  if (existeDuplicado) {
    return { 
      exito: false, 
      mensaje: "Error: La ruta ya existe para esta zona.", 
      rutas: listaRutas 
    };
  }

  const nuevasRutas = [...listaRutas, { nombre: nombre, zona: zona }];

  return { 
    exito: true, 
    mensaje: "Ruta registrada exitosamente.",
    rutas: nuevasRutas 
  };
}

export { registrarRuta };