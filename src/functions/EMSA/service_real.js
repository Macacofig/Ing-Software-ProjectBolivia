let list_Services = [];
// Use localStorage to store the list of services
function saveServicesToLocalStorage() {
    localStorage.setItem('services', JSON.stringify(list_Services));
}

function register_Route(day, distrito, zone, schedule, listaRutas) {
    // Load existing services from localStorage
    let list_Services = JSON.parse(localStorage.getItem('services')) || [];
    if (day !== "" && distrito !== "" && zone !== "" && schedule !== "" && listaRutas !== "" ) {
        //verify if the service already exists in the list_Services
        if(list_Services.length>0 && 
            list_Services.some(
            service => service.day === day && 
            service.distrito === distrito && 
            service.zone === zone && 
            service.schedule === schedule)) 
        {
            return "Service already exists";
        }
        list_Services.push({
            day: day,
            distrito: distrito,
            zone: zone,
            schedule: schedule,
            listaRutas: listaRutas
        });
        saveServicesToLocalStorage();
        return "New Service was registered Successfully";
    }
    return "All fields must be filled out";
}

function getServices() {
    // Load existing services from localStorage
    let list_Services = JSON.parse(localStorage.getItem('services')) || [];
    return list_Services;
}