class Service{
    constructor(
        day, 
        distrito, 
        zone, 
        schedule, 
        listaRutas, 
        currentList
    ){
        this.day = day;
        this.distrito = distrito;
        this.zone = zone;
        this.schedule = schedule;
        this.listaRutas = listaRutas;
        this.currentList = currentList;
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
    getListaRutas() {
        return this.listaRutas;
    }
    getCurrentList() {
        return this.currentList;
    }
    toJSON() {
        return {
            day: this.day,
            distrito: this.distrito,
            zone: this.zone,
            schedule: this.schedule,
            listaRutas: this.listaRutas,
            currentList: this.currentList
        };
    }
}

class ModelService {

    constructor() {
        this.services = [];
        this.loadServices();
    }
    loadServices() {
        const servicesData = JSON.parse(localStorage.getItem('services')) || [];
        this.services = servicesData.map(s => new Service(
            s.day,
            s.distrito,
            s.zone,
            s.schedule,
            s.listaRutas,
            s.currentList.split(",")
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
        localStorage.setItem('services', JSON.stringify(servicesJSON));
    }
}

export { Service, ModelService };