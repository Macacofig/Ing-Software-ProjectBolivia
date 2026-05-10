import { getServices } from '../../utils/localStorage.js';

const reportsContainer = document.getElementById("reportsContainer");

// Obtener reportes
let reports = getServices("reports");

// Render inicial
renderReports();

// =========================
// RENDER
// =========================
function renderReports() {

  reportsContainer.innerHTML = "";

  if (reports.length === 0) {

    reportsContainer.innerHTML = `
      <div class="empty-state">
        <h2>No hay reportes</h2>
        <p>Aún no se han registrado incidencias.</p>
      </div>
    `;

    return;
  }
  
  reports.forEach((report, index) => {

    const card = document.createElement("div");
    card.classList.add("report-card");

    card.innerHTML = `
      <div class="report-summary">

        <div class="report-info">

          <div class="info-block">
            <span class="label">Ubicación</span>
            <span class="value">${report.location}</span>
          </div>

          <div class="info-block">
            <span class="label">Ciudadano</span>
            <span class="value">${report.idCitizen}</span>
          </div>

          <div class="info-block">
            <span class="label">Fecha</span>
            <span class="value">${report.date}</span>
          </div>

          <div class="info-block">
            <span class="label">Estado</span>
            <span class="status ${report.status === 'completed' ? 'completed' : 'pending'}">
              ${report.status}
            </span>
          </div>

        </div>

        ${
          report.status !== "completed"
          ? `<button class="complete-btn" data-index="${index}">
              Completar
            </button>`
          : ""
        }

      </div>

      <div class="report-description">
        ${report.description}
      </div>
    `;

    // Expandir card
    card.addEventListener("click", (e) => {

      // evitar conflicto con botón
      if (e.target.classList.contains("complete-btn")) return;

      card.classList.toggle("expanded");
    });

    reportsContainer.appendChild(card);
  });

  activateCompleteButtons();
}

// =========================
// BOTONES COMPLETAR
// =========================
function activateCompleteButtons() {

  const buttons = document.querySelectorAll(".complete-btn");

  buttons.forEach(button => {

    button.addEventListener("click", (e) => {

      e.stopPropagation();

      const index = e.target.dataset.index;

      reports[index].status = "completed";

      localStorage.setItem("reports", JSON.stringify(reports));

      renderReports();
    });

  });

}