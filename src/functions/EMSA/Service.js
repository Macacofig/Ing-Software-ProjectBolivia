let list_Services= [];

function register_day(day)
{
    if(day!=="")
    {
        return "Day: Successfully registered"
    }
    return "Day is empty";
}
function register_district_zone(day, distrito, zone)
{
    if(day!=="" && distrito !== "" && zone !== "")
    {
        return "Day,District,Zone: Successfully registered"
    }
    return "Day, District or Zone is empty";
}

function register_schedule(day, distrito, zone, schedule)
{
    if(day!=="" && distrito !== "" && zone !== "" && schedule !== "")
    {
        return "Day,District,Zone,Schedule: Successfully registered"
    }
    return "Day, District, Zone or Schedule is empty";
}

function register_Route(day, distrito, zone, schedule, listaRutas) {
  
  if (!day) return { field: "day", message: "Selecciona un día" };

  if (!distrito) return { field: "district", message: "Selecciona un distrito" };

  if (!zone) return { field: "zone", message: "Selecciona una zona" };

  if (!schedule) return { field: "schedule", message: "Selecciona un horario" };

  if (!listaRutas || listaRutas.trim() === "") {
    return { field: "rutas", message: "Debes agregar al menos una ruta" };
  }

  // Verificar duplicados
  if (list_Services.length > 0 &&
    list_Services.some(
      service =>
        service.day === day &&
        service.distrito === distrito &&
        service.zone === zone &&
        service.schedule === schedule
    )
  ) {
    return { field: "general", message: "El servicio ya existe" };
  }

  // Guardar
  list_Services.push({
    day,
    distrito,
    zone,
    schedule,
    listaRutas
  });

  return { success: true };
}

function getServices() {
    return list_Services;
}

function clearServices() {
    list_Services = [];
}
export { register_day, register_district_zone, register_schedule, register_Route, getServices,clearServices};
