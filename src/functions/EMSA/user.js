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

        gridCards.innerHTML = "";
    });

    // ===== LOCAL STORAGE =====
    function getServices() {
        return JSON.parse(localStorage.getItem("services")) || [];
    }

    // ===== COLORES =====
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
            <p><strong>Día:</strong> ${service.day}</p>
            <p><strong>Hora:</strong> ${service.schedule}</p>
            <p><strong>Rutas:</strong> ${service.listaRutas.join(", ")}</p>
        `;

        return article;
    }

    // ===== RENDER =====
    function renderServices(services) {
        gridCards.innerHTML = "";

        if (services.length === 0) {
            gridCards.innerHTML = `
                <article class="card bg-red">
                    <p><strong>🚫 No hay servicio disponible</strong></p>
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

    btnBuscar.addEventListener("click", filterServices);

    // cargar todo al inicio
    renderServices(getServices());
});