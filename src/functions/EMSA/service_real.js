// Use localStorage to store the list of services
function saveServicesToLocalStorage(list_Services) {
    localStorage.setItem('services', JSON.stringify(list_Services));
}

function register_Route(day, distrito, zone, schedule, listaRutas, currentList = []) {
  let list_Services = getServices();

  if (!day) return { field: "day", message: "Selecciona un día" };

  if (!distrito) return { field: "district", message: "Selecciona un distrito" };

  if (!zone) return { field: "zone", message: "Selecciona una zona" };

  if (!schedule) return { field: "schedule", message: "Selecciona un horario" };

  if (!listaRutas || listaRutas.trim() === "") {
    return { field: "rutas", message: "Debes agregar al menos una ruta" };
  }

  const isDuplicate = (s) => 
    s.day === day && 
    s.distrito === distrito && 
    s.zone === zone && 
    s.schedule === schedule;
  
  if (list_Services.some(isDuplicate)) {
    return { field: "general", message: "El servicio ya existe" };
  }
  // Verificar duplicados
  if (currentList.some(s => 
      (s.Day || s.day) === day && 
      (s.District || s.distrito) === distrito && 
      (s.Zone || s.zone) === zone && 
      (s.Schedule || s.schedule) === schedule
    )) 
  {
    return { field: "general", message: "El servicio ya existe" };
  }

  return { success: true };
}

function addService(service) {
    let list_Services = getServices();
    list_Services.push(service);
    saveServicesToLocalStorage(list_Services);
}

function getServices() {
    // Load existing services from localStorage
    let list_Services = JSON.parse(localStorage.getItem('services')) || [];
    return list_Services;
}

export { register_Route, addService, getServices };