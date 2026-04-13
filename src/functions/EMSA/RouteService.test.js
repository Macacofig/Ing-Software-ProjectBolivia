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

  it("Paso 3: Debería fallar si falta el nombre o la zona", () => {
    const resultado = registrarRuta("", "Pucara", []);
    
    expect(resultado.exito).toBe(false);
    expect(resultado.mensaje).toBe("Error: Faltan datos.");
  });

  it("Paso 4: Debería rechazar si la ruta y zona ya existen", () => {
    
    const rutasExistentes = [{ nombre: "Ruta 1", zona: "Pucara" }];
    
    const resultado = registrarRuta("Ruta 1", "Pucara", rutasExistentes);
    
    expect(resultado.exito).toBe(false);
    expect(resultado.mensaje).toBe("Error: La ruta ya existe para esta zona.");
    expect(resultado.rutas.length).toBe(1); // La lista no debió crecer
  });
});