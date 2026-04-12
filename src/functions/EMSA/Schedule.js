const zoneSchedules = {
  "Pucara": "Tuesday and Friday, 07:00 - 09:00",
};

function get_schedule(zone) {
  if (!zone || !zoneSchedules[zone]) {
    return "No schedule found for this zone";
  }
  return zoneSchedules[zone];
}

export { get_schedule };