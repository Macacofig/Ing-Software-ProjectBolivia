import { register_report } from "./report.js";

describe("Reports", () => {
    
  it("It should register a report of a citizen ", () => {
    expect(register_report(1,"There is accumulated garbage", "caracoles")).toEqual("Report: Successfully registered");
  });
});