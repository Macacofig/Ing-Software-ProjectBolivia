import { register_day } from "./Service.js";
import { get_schedule } from "./Schedule.js";

const select = document.querySelector("#daySelect");
const selectDistrito = document.querySelector("#distrito");
const selectZona = document.querySelector("#zona");

const form = document.querySelector("#formulario");
const div = document.querySelector("#resultado-div");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const selectedDay = select.value;
  const distrito = selectDistrito.value;
  const zona = selectZona.value;

  const result = register_day(selectedDay, distrito, zona);
  const schedule = get_schedule(zona);

  div.innerHTML = "<p>" + result + "</p><p>Horario asignado: " + schedule + "</p>";
});