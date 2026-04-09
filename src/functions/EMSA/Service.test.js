import {register_day} from "./Service.js";

describe("Service", () => {
  it("It should register a day of service", () => {
    expect(register_day("monday")).toEqual("Day Successfully registered");
  });
});

