function register_day(day)
{
    if(day!=="")
    {
        return "Day: Successfully registered"
    }
    return "Invalid registration";
}
function register_district_zone(day, distrito, zone)
{
    if(day!=="" && distrito !== "" && zone !== "")
    {
        return "Day,District,Zone: Successfully registered"
    }
    return "Invalid registration";
}

function register_schedule(day, distrito, zone, schedule)
{
    if(day!=="" && distrito !== "" && zone !== "" && schedule !== "")
    {
        return "Day,District,Zone,Schedule: Successfully registered"
    }
    return "Invalid registration";
}

export { register_day, register_district_zone, register_schedule};