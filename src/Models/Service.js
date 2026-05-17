import {
    saveServicesToLocalStorage,
    getServices
} from "../utils/localStorage.js";

class Service{
    constructor(
        day, 
        distrito, 
        zone, 
        schedule, 
        routes = [],
        status = "available"
    ){
        this.day = day;
        this.distrito = distrito;
        this.zone = zone;
        this.schedule = schedule;
        this.routes = routes;
        this.status = status;
    }

    getDay() {
        return this.day;
    }
    getDistrito() {
        return this.distrito;
    }
    getZone() {
        return this.zone;
    }
    getSchedule() {
        return this.schedule;
    }
    getRoutes() {
        return this.routes;
    }
    getStatus() {
        return this.status;
    }
    toJSON() {
        return {
            day: this.day,
            distrito: this.distrito,
            zone: this.zone,
            schedule: this.schedule,
            routes: this.routes,
            status: this.status
        };
    }
}

class ModelService {

    constructor() {
        this.services = [];
        this.loadServices();
    }
    loadServices() {
        const servicesData = getServices('services');
        this.services = servicesData.map(s => new Service(
            s.day,
            s.distrito,
            s.zone,
            s.schedule,
            s.routes || [],
            s.status || "available"
        ));
    }
    getServices() {
        return this.services;
    }
    addService(service) {
        this.services.push(service);
        this.saveServices();
    }
    saveServices() {
        const servicesJSON = this.services.map(s => s.toJSON());
        saveServicesToLocalStorage(servicesJSON, 'services');
    }

    updateService(index, updatedService) {

        this.services[index] = updatedService;

        this.saveServices();

    }

    deleteService(index) {

        this.services.splice(index, 1);

        this.saveServices();

    }
}

function isDuplicateService(service, servicesList) {
    return servicesList.some(s =>
        s.day === service.day &&
        s.distrito === service.distrito &&
        s.zone === service.zone &&
        s.schedule === service.schedule
    );
}

function verify_service(service, servicesList = [], currentList = []) 
{

  if (!service.day) return {field: "day",message: "Selecciona un día"};

  if (!service.distrito) return {field: "district",message: "Selecciona un distrito"};

  if (!service.zone) return {field: "zone",message: "Selecciona una zona"};

  if (!service.schedule) return {field: "schedule",message: "Selecciona un horario"};

  if (!service.routes ||service.routes.length === 0) return {field: "rutas",message: "Debes agregar al menos una ruta"};

  if (isDuplicateService(service, servicesList)) return {field: "general",message:"El servicio ya existe"};

  if (isDuplicateService(service, currentList)) return {field: "general",message:"El servicio ya existe"};
    
  return {success: true};
}

function filter_services(services,{distrito = "", zone = "", day = "", search = ""} = {}) 
{
    return services.filter(service => {

        const matchesDistrito = !distrito || service.distrito === distrito;

        const matchesZone = !zone || service.zone === zone;

        const matchesDay = !day || service.day.toLowerCase().includes(day.toLowerCase());

        const matchesSearch = !search || service.routes.some(route => route.toLowerCase().includes(search.toLowerCase()));

        return ( matchesDistrito && matchesZone && matchesDay && matchesSearch);
    });
}

export { Service, ModelService, verify_service, filter_services };