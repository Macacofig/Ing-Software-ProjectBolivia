function register_day(day)
{
    if(day!=="")
    {
        return "Day: Successfully registered"
    }
}
function register_district_zone(day, distrito, zone)
{
    if(day!=="" && distrito !== "" && zone !== "")
    {
        return "Day,District,Zone: Successfully registered"
    }
}

function register_schedule(day, distrito, zone, schedule)
{
    if(day!=="" && distrito !== "" && zone !== "" && schedule !== "")
    {
        return "Day,District,Zone,Schedule: Successfully registered"
    }
}

function register_Route(day, distrito, zone, schedule, listaRutas) {
  if (day !== "" && distrito !== "" && zone !== "" && schedule !== "" && listaRutas.length !== "" ) {
    return "Day,District,Zone,Schedule,Rute: Successfully registered";
  }
}

export { register_day, register_district_zone, register_schedule, register_Route};