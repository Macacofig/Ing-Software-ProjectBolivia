import { login_user, ModelUser } from "./User.js";

describe("User", () => {

  it("login fails if email is empty", () => {
    expect(login_user("", "1234")).toEqual({
      success: false,
      message: "Email y contraseña requeridos"
    });
  });
   
  it("login fails if password is empty", () => {
    expect(login_user("ale@gmail.com", "")).toEqual({
      success: false,
      message: "Email y contraseña requeridos"
    });
  });

   it("login fails if user not found", () => {
    expect(login_user("noexiste@gmail.com", "1234")).toEqual({
      success: false,
      message: "Credenciales incorrectas"
    });
  });

});