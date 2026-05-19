function register_report(idCitizen, description, location) 
{
    if(description === "") {
        return "Description cannot be empty";
    }
    if(location === "") {
        return "Location cannot be empty";
    }
    return "Report: Successfully registered";
}

function register_user(name, email, role)
{
    if(name === "" || email === "" || role === "") {
        return "All fields are required";
    }
    return "User Successfully registered";
}

export { register_report, register_user };