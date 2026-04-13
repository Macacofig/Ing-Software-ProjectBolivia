import { registrarRuta } from "./RouteService.js";

describe("RouteService", () => {
  it("Paso 1: Debería devolver éxito al recibir datos", () => {
    const resultado = registrarRuta("Ruta 1", "Pucara", []);
    
    expect(resultado.exito).toBe(true);
  });

  it("Paso 2: Debería devolver éxito, mensaje y la ruta guardada", () => {
    const resultado = registrarRuta("Ruta 1", "Pucara", []);
    
    expect(resultado.exito).toBe(true);
    expect(resultado.mensaje).toBe("Ruta registrada exitosamente.");
    expect(resultado.rutas.length).toBe(1); // Exigimos que la lista crezca
    expect(resultado.rutas[0]).toEqual({ nombre: "Ruta 1", zona: "Pucara" });
  });
});