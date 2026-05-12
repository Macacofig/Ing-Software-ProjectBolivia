import { verify_report, register_report } from "./report_real.js";

const form = document.getElementById("reportForm");
const messageBox = document.getElementById("messageBox");

// =======================
// GUARDAR EN LOCAL STORAGE UN NUEVO REPORTE
// =======================
// Evento principal (submit del form)
form.addEventListener("submit", function (event) {
  event.preventDefault(); // evita recarga

  const idCitizen = document.getElementById("idCitizen").value;
  const description = document.getElementById("description").value;
  const location = document.getElementById("location").value;

  const verificationResult = verify_report(idCitizen, description, location);
  if (!verificationResult.success) 
  {
    renderMessage(verificationResult);
    return;
  }

  const registrationResult = register_report(idCitizen, description, location);
  renderMessage(registrationResult);
  form.reset();
});

// Render del mensaje
function renderMessage(result) {
  messageBox.className = "message-box"; // reset

 if (!result.success) {
    messageBox.classList.add("error");
  } else {
    messageBox.classList.add("success");
  }

  messageBox.textContent = result.message;
}