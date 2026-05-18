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

  it("login success for citizen", () => {
    const model = new ModelUser();
    model.addUser({ id: 1, nombre: "Ale", correo: "ale@gmail.com", password: "1234", role: "citizen" });
    expect(login_user("ale@gmail.com", "1234", model.getUsers())).toEqual({
      success: true,
      role: "citizen",
      id: 1
    });
  });

});