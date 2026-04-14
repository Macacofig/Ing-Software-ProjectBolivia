function register_day(day)
{
    if(day!=="")
    {
        return "Day: Successfully registered"
    }
    return "Invalid registration";
}
function register_district_zone(day, distrito, zone)
{
    if(day!=="" && distrito !== "" && zone !== "")
    {
        return "Day,District,Zone: Successfully registered"
    }
    return "Invalid registration";
}

function register_schedule(day, distrito, zone, schedule)
{
    if(day!=="" && distrito !== "" && zone !== "" && schedule !== "")
    {
        return "Day,District,Zone,Schedule: Successfully registered"
    }
    return "Invalid registration";
}

function register_Route(day, distrito, zone, schedule, listaRutas) {
  if (day === "" || distrito === "" || zone === "" || schedule === "" || listaRutas.length === "" ) {
    return "Error: Faltan datos.";
  }

  // const existeDuplicado = listaRutas.some(
  //   (ruta) => ruta.nombre === nombre && ruta.zona === zona
  // );

  // if (existeDuplicado) {
  //   return { 
  //     exito: false, 
  //     mensaje: "Error: La ruta ya existe para esta zona.", 
  //     rutas: listaRutas 
  //   };
  // }

  //const nuevasRutas = [...listaRutas, { nombre: nombre, zona: zona }];

  return "Day,District,Zone,Schedule,Rute: Successfully registered";
}

export { register_day, register_district_zone, register_schedule, register_Route};