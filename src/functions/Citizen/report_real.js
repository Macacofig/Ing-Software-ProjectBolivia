import { getServices, saveServicesToLocalStorage } from "../../utils/localStorage.js";

function verify_report(idCitizen, description, location) 
{
    if(description === "") return {"message": "Description cannot be empty", "success": false};
    if(location === "") return {"message": "Location cannot be empty", "success": false};
    return {"message": "Report: Successfully registered", "success": true};
}

function register_report(idCitizen, description, location)
{
    const reports = getServices('reports');
    const newReport = {
        "idCitizen": idCitizen,
        "description": description,
        "location": location,
        "date": new Date().toISOString(),
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