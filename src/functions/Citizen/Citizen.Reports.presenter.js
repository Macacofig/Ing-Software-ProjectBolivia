import {
  getServices
} from '../../utils/localStorage.js';

import {
  verify_report,ModelReport
} from '../../Models/Report.js';

// =========================
// ELEMENTOS
// =========================
const reportsContainer =
  document.getElementById("reportsContainer");

const idCitizenFilter =
  document.getElementById("idCitizenFilter");

const dateFilter =
  document.getElementById("dateFilter");

const filterButton =
  document.getElementById("filterButton");

const clearButton =
  document.getElementById("clearButton");

// =========================
// DATA
// =========================
let reports = new ModelReport();


// =========================
// EVENTOS
// =========================
filterButton.addEventListener(
  "click",
  applyFilters
);

idCitizenFilter.addEventListener(
  "input",
  applyFilters
);

clearButton.addEventListener(
  "click",
  clearFilters
);

// =========================
// FILTRAR
// =========================
function applyFilters() {

  const filteredReports =
    reports.filterReports(
      {
        idCitizen:
          idCitizenFilter.value,

        date:
          dateFilter.value
      }
    );

  renderReports(filteredReports);

}

// =========================
// LIMPIAR FILTROS
// =========================
function clearFilters() {

  idCitizenFilter.value = "";

  dateFilter.value = "";

  renderReports(reports.getReports());

}

// =========================
// RENDER
// =========================
function renderReports(reportsToRender) {

  reportsContainer.innerHTML = "";

  // SIN REPORTES
  if (reportsToRender.length === 0) {

    reportsContainer.innerHTML = `
      <div class="empty-state">
        <h2>No hay reportes</h2>
        <p>No se encontraron incidencias.</p>
      </div>
    `;

    return;
  }

  // CARDS
  reportsToRender.forEach(report => {

    const card =
      document.createElement("div");

    card.classList.add("report-card");

    card.innerHTML = `
      <div class="report-summary">

        <div class="report-info">

          <div class="info-block">
            <span class="label">
              ID Reporte
            </span>

            <span class="value">
              ${report.id}
            </span>
          </div>

          <div class="info-block">
            <span class="label">
              Ubicación
            </span>

            <span class="value">
              ${report.location}
            </span>
          </div>

          <div class="info-block">
            <span class="label">
              Fecha
            </span>

            <span class="value">
              ${formatDate(report.date)}
            </span>
          </div>

          <div class="info-block">
            <span class="label">
              Estado
            </span>

            <span class="
              status
              ${report.status === 'Completed'
                ? 'completed'
                : 'pending'}
            ">
              ${report.status}
            </span>
          </div>

        </div>

      </div>

      <div class="report-description">
        ${report.description}
      </div>
    `;

    // EXPANDIR
    card.addEventListener(
      "click",
      () => {
        card.classList.toggle(
          "expanded"
        );
      }
    );

    reportsContainer.appendChild(card);

  });

}

// =========================
// FECHA
// =========================
function formatDate(dateString) {

  const date =
    new Date(dateString);

  return date.toLocaleDateString(
    "es-ES"
  );

}
renderReports(reports.getReports());