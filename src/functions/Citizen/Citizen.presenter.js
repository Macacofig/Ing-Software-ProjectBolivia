import { getServices } from "../EMSA/service_real.js";

document.addEventListener("DOMContentLoaded", () => {

    const btnBuscar = document.querySelector(".search-btn");
    const gridCards = document.getElementById("grid-cards");

    const selectDistrito = document.getElementById("filter-distrito");
    const selectZona = document.getElementById("filter-zona");
    const selectDia = document.getElementById("filter-dia");

    const Zones_by_district = {
        "2": ["Barrio Policial", "Colquiri", "Ticti Norte"],
        "6": ["Alto Cochabamba"],
        "7": ["Villa Venezuela"],
        "8": ["Ushpa Ushpa", "Las Rocas", "San Andrés", "Nueva Vera Cruz"],
        "9": ["Aguas Calientes", "San Antonio", "Villa Paraíso", "21 de Septiembre", "Pucara"],
        "15": ["Arrumani Agrario", "J.V. Copacabana"]
    };

    // ===== ZONAS DINÁMICAS =====
    selectZona.disabled = true;

    selectDistrito.addEventListener("change", function () {
        const distrito = this.value;

        selectZona.innerHTML = '<option value="">Seleccionar</option>';
        selectZona.disabled = !distrito;

        if (Zones_by_district[distrito]) {
            Zones_by_district[distrito].forEach(zona => {
                const option = document.createElement("option");
                option.value = zona;
                option.textContent = zona;
                selectZona.appendChild(option);
            });
        }

        filterServices();
    });

    // ===== COLORES POR DÍA =====
    function getColorByDay(day) {
        day = day.toLowerCase();

        if (day === "lunes" || day === "martes") return "bg-green";
        if (day === "miercoles" || day === "miércoles" || day === "jueves") return "bg-orange";
        if (day === "viernes" || day === "sabado" || day === "sábado" || day === "domingo") return "bg-red";

        return "";
    }

    // ===== CREAR CARD =====
    function createCard(service) {
        const article = document.createElement("article");
        article.className = `card ${getColorByDay(service.day)}`;

        article.innerHTML = `
            <p><strong>Distrito:</strong> ${service.distrito}</p>
            <p><strong>Zona:</strong> ${service.zone}</p>
            <p><strong>Día:</strong> ${capitalize(service.day)}</p>
            <p><strong>Hora:</strong> ${service.schedule}</p>
            <p><strong>Rutas:</strong> ${service.listaRutas}</p>
        `;

        return article;
    }

    // ===== CAPITALIZAR TEXTO =====
    function capitalize(text) {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

    // ===== RENDER =====
    function renderServices(services) {
        gridCards.innerHTML = "";

        if (services.length === 0) {
            gridCards.innerHTML = `
                <article class="card bg-orange">
                    <p><strong>🔍 No se encontraron resultados</strong></p>
                    <p>Prueba con otros filtros</p>
                </article>
            `;
            return;
        }

        services.forEach(service => {
            gridCards.appendChild(createCard(service));
        });
    }

    // ===== FILTRO =====
    function filterServices() {
        const distrito = selectDistrito.value;
        const zona = selectZona.value;
        const dia = selectDia.value;

        const services = getServices();

        const filtered = services.filter(service => {
            return (
                (!distrito || service.distrito === distrito) &&
                (!zona || service.zone === zona) &&
                (!dia || service.day.toLowerCase().includes(dia.toLowerCase()))
            );
        });

        renderServices(filtered);
    }

    // ===== EVENTOS =====
    btnBuscar.addEventListener("click", filterServices);

    // filtros automáticos (UX pro)
    selectZona.addEventListener("change", filterServices);
    selectDia.addEventListener("change", filterServices);

    // ===== CARGA INICIAL =====
    renderServices(getServices());
});