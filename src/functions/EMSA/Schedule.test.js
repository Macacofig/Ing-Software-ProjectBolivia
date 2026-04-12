import { get_schedule } from "./Schedule.js";

describe("Schedule", () => {

  it("should return the schedule for a zone that has one assigned", () => {
    const result = get_schedule("Pucara");
    expect(result).toEqual("Tuesday and Friday, 07:00 - 09:00");
  });

  it("should return an error when the zone has no schedule assigned", () => {
  const result = get_schedule("Zona Desconocida");
  expect(result).toEqual("No schedule found for this zone");
});

  });