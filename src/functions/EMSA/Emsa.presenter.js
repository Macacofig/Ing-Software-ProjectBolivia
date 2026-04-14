import { register_schedule } from "./Service.js";

//Data elements
const Day_input = document.getElementById("daySelect"); // DAY INPUT
const District_input = document.getElementById("distrito"); // DISTRICT INPUT
const Zone_input = document.getElementById("zona"); // ZONE INPUT
const Schedule_input = document.getElementById("schedule"); // SCHEDULE INPUT
//form
const form = document.getElementById("formulario");

//Data zones
const Zones_by_district = {
  "2": ["Barrio Policial", "Colquiri", "Ticti Norte"],
  "6": ["Alto Cochabamba"],
  "7": ["Villa Venezuela"],
  "8": ["Ushpa Ushpa", "Las Rocas", "San Andrés", "Nueva Vera Cruz"],
  "9": ["Aguas Calientes", "San Antonio", "Villa Paraíso", "21 de Septiembre", "Pucara"],
  "15": ["Arrumani Agrario", "J.V. Copacabana"]
};


// Logic for zone and district select
/*****************************************************************/
/*****************************************************************/
// Turn off zona select until district is selected
Zone_input.disabled = true;

District_input.addEventListener("change", function() {
  const distrito = this.value;

  // Clear zones
  Zone_input.innerHTML = '<option value="">Selecciona zona</option>';

  // activar o desactivar
  Zone_input.disabled = !distrito;

  if (Zones_by_district[distrito]) {
    Zones_by_district[distrito].forEach(zona => {
      const option = document.createElement("option");
      option.value = zona;
      option.textContent = zona;
      Zone_input.appendChild(option);
    });
  }
});
/*****************************************************************/
/*****************************************************************/

// Form submission logic
/*****************************************************************/
/*****************************************************************/

const lista = document.getElementById("lista-registros");
const clearBtn = document.getElementById("clearBtn");
const guardarTodoBtn = document.getElementById("guardarTodo");

// Array for storing records in memory
let registros = [];

// Clear form
clearBtn.addEventListener("click", () => {
  form.reset();
  Zone_input.disabled = true;
});

// Save in UI
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const Day = Day_input.value;
  const District = District_input.value;
  const Zone = Zone_input.value;
  const Schedule = Schedule_input.value;

  const data = { Day, District, Zone, Schedule };
  registros.push(data);

  renderRegistros();
});
/*****************************************************************/
/*****************************************************************/


// Logic for rendering records in the UI
/*****************************************************************/
/*****************************************************************/
// RENDER
function renderRegistros() {
  lista.innerHTML = "";

  registros.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("registro-item");

    div.innerHTML = `
      <p><strong>Día:</strong> ${item.Day}</p>
      <p><strong>Distrito:</strong> ${item.District}</p>
      <p><strong>Zona:</strong> ${item.Zone}</p>
      <p><strong>Horario:</strong> ${item.Schedule}</p>
      <hr>
    `;

    lista.appendChild(div);
  });
}
/*****************************************************************/
/*****************************************************************/

// SAVE ALL LOGIC IN BACKEND
/*****************************************************************/
/*****************************************************************/
guardarTodoBtn.addEventListener("click", () => {
  console.log(registros);

  // lógica para guardar en backend
  // TODO: enviar registros a API
});
/*****************************************************************/
/*****************************************************************/
