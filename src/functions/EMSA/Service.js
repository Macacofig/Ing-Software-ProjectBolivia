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
  // 1. Nueva validación específica para hacer pasar tu test
  if (day === "") {
    return "Please select a day";
  }

  // 2. Lógica original para el resto de los campos
  if (distrito !== "" && zone !== "" && schedule !== "" && listaRutas.length !== "") {
    
    // Verificar si el servicio ya existe
    if (list_Services.length > 0 && 
        list_Services.some(
          service => service.day === day && 
          service.distrito === distrito && 
          service.zone === zone && 
          service.schedule === schedule
        )) 
    {
        return "Service already exists";
    }
    
    // Guardar el nuevo servicio
    list_Services.push({
        day: day,
        distrito: distrito,
        zone: zone,
        schedule: schedule,
        listaRutas: listaRutas
    });
    
    return "New Service was registered Successfully";
  }
  
  // Mensaje genérico de respaldo para los demás campos vacíos
  return "All fields must be filled out";
}

function getServices() {
    return list_Services;
}

function clearServices() {
    list_Services = [];
}
export { register_day, register_district_zone, register_schedule, register_Route, getServices,clearServices};
