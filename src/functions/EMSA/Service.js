function register_day(day, distrito)
{
    if(day!=="" && distrito !== "")
    {
        return "Successfully registered"
    }
    return "Invalid day";
}

export { register_day };