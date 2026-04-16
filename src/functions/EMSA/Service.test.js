import {register_day, register_district_zone, register_schedule, register_Route, getServices,clearServices} from "./Service.js";

describe("Service", () => {
    
  it("It should register a day of service", () => {
    expect(register_day("monday")).toEqual("Day: Successfully registered");
  });

  it("It should register day with district and zone", () => {
    expect(register_district_zone("monday", "9", "Pucara")).toEqual("Day,District,Zone: Successfully registered");
  });
  it("It should register day with district, zone and schedule", () => {
    expect(register_schedule("monday", "9", "Pucara", "8:00-12:00")).toEqual("Day,District,Zone,Schedule: Successfully registered");
  });
  it("Debería devolver éxito al recibir datos", () => {
    expect(register_Route("Lunes", "Pucara", "Zona 1", "08:00-12:00", "caracoles")).toEqual("New Service was registered Successfully");
  });
  it("Debería devolver que ya existe ", () => {
    register_Route("Lunes", "Pucara", "Zona 1", "08:00-12:00", "caracoles");
    expect(register_Route("Lunes", "Pucara", "Zona 1", "08:00-12:00", "caracoles")).toEqual("Service already exists");
  });
  it("Debería devolver que error por campos vacíos", () => {
    expect(register_Route("", "Pucara", "Zona 1", "08:00-12:00", "caracoles")).toEqual("All fields must be filled out");
  });
  it("Debería devolver la lista de servicios", () => {
    register_Route("Lunes", "Pucara", "Zona 1", "08:00-12:00", "caracoles");
    expect(getServices()).toEqual([
      {
        day: "Lunes",
        distrito: "Pucara",
        zone: "Zona 1",
        schedule: "08:00-12:00",
        listaRutas: "caracoles"
      }
    ]);
  });
  it("Debería devolver la lista de servicios", () => {
    clearServices();
    register_Route("Lunes", "9", "Zona 1", "08:00-12:00", "caracoles");
    register_Route("Martes", "2", "Zona 2", "09:00-12:00", "caracoles, tortugas");
    expect(getServices()).toEqual([
      {
        day: "Lunes",
        distrito: "9",
        zone: "Zona 1",
        schedule: "08:00-12:00",
        listaRutas: "caracoles"
      },
      {
        day: "Martes",
        distrito: "2",
        zone: "Zona 2",
        schedule: "09:00-12:00",
        listaRutas: "caracoles, tortugas"
      }
    ]);
  });
});
