import { getServices, saveServicesToLocalStorage } from "../../utils/localStorage.js";

function verify_report(idCitizen, description, location) 
{
    if(description === "") return {"message": "Description cannot be empty", "success": false};
    if(location === "") return {"message": "Location cannot be empty", "success": false};
    return {"message": "Report: Successfully registered", "success": true};
}

function generateReportId(reports) {

    // Sin reportes
    if (reports.length === 0) {
        return 1;
    }

    // Obtener IDs ordenados
    const ids = reports
        .map(report => report.id)
        .sort((a, b) => a - b);

    const maxId = ids[ids.length - 1];

    // Si falta el último
    if (!ids.includes(maxId - 1) && maxId > 1) {
        return maxId - 1;
    }

    // Continuar secuencia
    return maxId + 1;
}

function register_report(idCitizen, description, location)
{
    const reports = getServices('reports');
    const newReport = {
        "id" : generateReportId(reports),
        "idCitizen": idCitizen,
        "description": description,
        "location": location,
        "date": new Date().toLocaleDateString("sv-SE"),
        "status": "Pending"
    };
    reports.push(newReport);
    saveServicesToLocalStorage(reports, 'reports');
    return {
        message: "Report successfully registered",
        success: true
    };
}

export { verify_report, register_report };