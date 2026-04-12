const zoneSchedules = {
  "Barrio Policial":  "Monday and Thursday, 06:00 - 08:00",
  "Colquiri":         "Monday and Thursday, 06:00 - 08:00",
  "Ticti Norte":      "Monday and Thursday, 06:00 - 08:00",
  "Alto Cochabamba":  "Wednesday and Saturday, 07:00 - 09:00",
  "Villa Venezuela":  "Wednesday and Saturday, 08:00 - 10:00",
  "Ushpa Ushpa":      "Tuesday and Friday, 06:00 - 08:00",
  "Las Rocas":        "Tuesday and Friday, 06:00 - 08:00",
  "San Andrés":       "Tuesday and Friday, 06:00 - 08:00",
  "Nueva Vera Cruz":  "Tuesday and Friday, 06:00 - 08:00",
  "Aguas Calientes":  "Tuesday and Friday, 07:00 - 09:00",
  "San Antonio":      "Tuesday and Friday, 07:00 - 09:00",
  "Villa Paraíso":    "Tuesday and Friday, 07:00 - 09:00",
  "21 de Septiembre": "Tuesday and Friday, 07:00 - 09:00",
  "Pucara":           "Tuesday and Friday, 07:00 - 09:00",
  "Arrumani Agrario": "Thursday and Sunday, 07:00 - 09:00",
  "J.V. Copacabana":  "Thursday and Sunday, 07:00 - 09:00",
};

function get_schedule(zone) {
  if (!zone || !zoneSchedules[zone]) {
    return "No schedule found for this zone";
  }
  return zoneSchedules[zone];
}

export { get_schedule };