import {register_day} from "./Service.js";

const select = document.querySelector("#daySelect");
const form = document.querySelector("#day-form");
const div = document.querySelector("#resultado-div");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const selectedDay = select.value;

  const result = register_day(selectedDay);

  div.innerHTML = "<p>" + result + "</p>";
});