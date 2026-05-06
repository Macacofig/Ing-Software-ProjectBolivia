function register_report(idCitizen, description, location) 
{
    if(description === "") {
        return "Description cannot be empty";
    }
    return "Report: Successfully registered";
}

export { register_report };