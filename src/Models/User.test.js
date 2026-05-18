import { login_user, ModelUser } from "./User.js";

describe("User", () => {

  it("login fails if email is empty", () => {
    expect(login_user("", "1234")).toEqual({
      success: false,
      message: "Email y contraseña requeridos"
    });
  });
   
});