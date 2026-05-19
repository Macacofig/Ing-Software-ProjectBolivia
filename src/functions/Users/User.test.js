import { register_user } from "./User.js";
describe("Users", () => {
    
  it("It should show a registered user", () => {
    expect(register_user("nataly","nramirezmachicado@gmail.com","password","citizen")).toEqual("User Successfully registered");
  });
  it("It should show an error if name is empty", () => {
    expect(register_user("","nramirezmachicado@gmail.com","password", "citizen")).toEqual("The name field is required");
  });
  it("It should show an error if email is empty", () => {
    expect(register_user("nataly","", "password", "citizen")).toEqual("The email field is required");
  });
  it("It should show an error if role is empty", () => {
    expect(register_user("nataly","nramirezmachicado@gmail.com", "password", "")).toEqual("The role field is required");
  });
  it("It should show an error if password is empty", () => {
    expect(register_user("nataly","nramirezmachicado@gmail.com", "", "citizen")).toEqual("The password field is required");
  });
  it("It should show an error if any field is empty", () => {    
    expect(register_user("","","","")).toEqual("The all field is required");
  });

});