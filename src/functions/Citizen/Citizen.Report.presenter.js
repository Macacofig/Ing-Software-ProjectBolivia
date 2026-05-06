import { register_report } from './report.js';

const form = document.getElementById("reportForm");
const messageBox = document.getElementById("messageBox");

// Evento principal (submit del form)
form.addEventListener("submit", function (event) {
  event.preventDefault(); // evita recarga

  const idCitizen = document.getElementById("idCitizen").value;
  const description = document.getElementById("description").value;
  const location = document.getElementById("location").value;

  const result = register_report(idCitizen, description, location);

  renderMessage(result);
});

// Render del mensaje
function renderMessage(message) {
  messageBox.className = "message-box"; // reset

  if (message.includes("cannot")) {
    messageBox.classList.add("error");
  } else {
    messageBox.classList.add("success");
  }

  messageBox.textContent = message;
}