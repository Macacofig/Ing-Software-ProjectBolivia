import { login_user } from "./User.js";

const usuariosBasura = [
  { id: 1, correo: "ale@gmail.com", password: "1234", role: "citizen" },
  { id: 2, correo: "admin@emsa.com", password: "admin123", role: "admin" }
];

describe("User", () => {

  it("login falla si email vacio", () => {
    expect(login_user("", "1234", usuariosBasura)).toEqual({
      success: false,
      message: "Email y contraseña requeridos"
    });
  });

  it("login falla si password vacio", () => {
    expect(login_user("ale@gmail.com", "", usuariosBasura)).toEqual({
      success: false,
      message: "Email y contraseña requeridos"
    });
  });

  it("login falla si usuario no existe", () => {
    expect(login_user("noexiste@gmail.com", "1234", usuariosBasura)).toEqual({
      success: false,
      message: "Credenciales incorrectas"
    });
  });

  it("login exitoso ciudadano", () => {
    expect(login_user("ale@gmail.com", "1234", usuariosBasura)).toEqual({
      success: true,
      role: "citizen",
      id: 1
    });
  });

  it("login exitoso admin", () => {
    expect(login_user("admin@emsa.com", "admin123", usuariosBasura)).toEqual({
      success: true,
      role: "admin",
      id: 2
    });
  });

});