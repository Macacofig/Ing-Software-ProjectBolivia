function registrarRuta(nombre, zona, listaRutas) {
  
  if (nombre === "" || zona === "") {
    return { exito: false, mensaje: "Error: Faltan datos.", rutas: listaRutas };
  }

  const nuevasRutas = [...listaRutas, { nombre: nombre, zona: zona }];

  return { 
    exito: true, 
    mensaje: "Ruta registrada exitosamente.",
    rutas: nuevasRutas 
  };
}

export { registrarRuta };