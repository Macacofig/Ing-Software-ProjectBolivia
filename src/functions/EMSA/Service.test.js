import {register_day, register_district_zone, register_schedule, register_Route} from "./Service.js";

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
  

  it("It should return error when day is empty", () => {
  expect(register_day("")).toEqual("Day is empty");
   });

  it("It should return error when district or zone is empty", () => {
  expect(register_district_zone("monday", "", "Pucara")).toEqual("Day, District or Zone is empty");
  });

  it("It should return error when schedule is empty", () => {
  expect(register_schedule("monday", "9", "Pucara", "")).toEqual("Day, District, Zone or Schedule is empty");
  });


});

