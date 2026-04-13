import { registrarRuta } from "./RouteService.js";

describe("RouteService - Baby Steps", () => {
  it("Paso 1: Debería devolver éxito al recibir datos", () => {
    const resultado = registrarRuta("Ruta 1", "Pucara", []);
    
    expect(resultado.exito).toBe(true);
  });
});