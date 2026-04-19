// Use localStorage to store the list of services
function saveServicesToLocalStorage(list_Services) {
    localStorage.setItem('services', JSON.stringify(list_Services));
}

function register_Route(day, distrito, zone, schedule, listaRutas) {
  let list_Services = getServices();

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