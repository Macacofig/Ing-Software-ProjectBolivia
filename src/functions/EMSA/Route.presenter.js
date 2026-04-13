import { registrarRuta } from "./RouteService.js";

const routeForm = document.querySelector("#route-form");
const inputNombre = document.querySelector("#nombreRuta");
const inputZona = document.querySelector("#zonaRuta");
const divMensaje = document.querySelector("#mensaje-ruta");
const ulListaRutas = document.querySelector("#lista-rutas");

let rutasGuardadas = [];

routeForm.addEventListener("submit", (event) => {
  event.preventDefault(); 

  const nombre = inputNombre.value.trim();
  const zona = inputZona.value.trim();

  const resultado = registrarRuta(nombre, zona, rutasGuardadas);

  rutasGuardadas = resultado.rutas;

  divMensaje.textContent = resultado.mensaje;
  divMensaje.style.color = resultado.exito ? "green" : "red";

  if (resultado.exito) {
    ulListaRutas.innerHTML = "";
    
    rutasGuardadas.forEach(ruta => {
      const li = document.createElement("li");
      li.textContent = `${ruta.nombre} - Zona: ${ruta.zona}`;
      ulListaRutas.appendChild(li);
    });

    inputNombre.value = "";
    inputZona.value = "";
  }
});