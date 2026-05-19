import { register_report , register_user } from "./report.js";

describe("Reports", () => {
    
  it("It should register a report of a citizen ", () => {
    expect(register_report(1,"There is accumulated garbage", "caracoles")).toEqual("Report: Successfully registered");
  });
  it("It should show an error if description is empty", () => {
    expect(register_report(1,"", "caracoles")).toEqual("Description cannot be empty");
  });
  it("It should show an error if location is empty", () => {
    expect(register_report(1,"There is accumulated garbage", "")).toEqual("Location cannot be empty");
  });
  it("It should show a registered user", () => {
    expect(register_user("nataly","nramirezmachicado@gmail.com", "citizien")).toEqual("User Successfully registered");
  });
  it("It should show an error if name is empty", () => {
    expect(register_user("","nramirezmachicado@gmail.com", "citizien")).toEqual("The name field is required");
  });
  it("It should show an error if email is empty", () => {
    expect(register_user("nataly","", "citizien")).toEqual("The email field is required");
  });
});