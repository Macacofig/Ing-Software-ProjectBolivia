import {register_day, register_district_zone, register_schedule} from "./Service.js";

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
});

