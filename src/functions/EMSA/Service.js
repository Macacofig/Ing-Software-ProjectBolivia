function register_day(day, distrito, zona)
{
    if(day!=="" && distrito !== "" && zona !== "")
    {
        return "Successfully registered"
    }
    return "Invalid day";
}

export { register_day };