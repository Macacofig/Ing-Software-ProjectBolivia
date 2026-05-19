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

function register_user(name, email, password, role)
{
    if(name === "" && email === "" && password === "" && role === "") {
        return "The all field is required";
    }
    if(name === "") {
        return "The name field is required";
    }
    if(email === "") {
        return "The email field is required";
    }
    if(role === "") {
        return "The role field is required";
    }
    if(password === "") {
        return "The password field is required";
    }
    return "User Successfully registered";
}

export { register_report, register_user };