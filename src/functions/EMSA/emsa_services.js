const gridCards = document.getElementById("grid-cards");

const btnBuscar = document.querySelector(".search-btn");

const selectDistrito = document.getElementById("filter-distrito");
const selectZona = document.getElementById("filter-zona");
const selectDia = document.getElementById("filter-dia");

const searchInput = document.getElementById("search-input");

/* MODALS */

const editModal = document.getElementById("edit-modal");
const deleteModal = document.getElementById("delete-modal");

const editDistrito = document.getElementById("edit-distrito");
const editZona = document.getElementById("edit-zona");
const editDia = document.getElementById("edit-dia");
const editHorario = document.getElementById("edit-horario");
const editStatus = document.getElementById("edit-status");
const editRutas = document.getElementById("edit-rutas");

const saveEdit = document.getElementById("save-edit");

const cancelEdit = document.getElementById("cancel-edit");

const cancelDelete = document.getElementById("cancel-delete");

const confirmDelete = document.getElementById("confirm-delete");

let currentEditIndex = null;
let currentDeleteIndex = null;

const Zones_by_district = {
    "2": ["Barrio Policial", "Colquiri", "Ticti Norte"],
    "6": ["Alto Cochabamba"],
    "7": ["Villa Venezuela"],
    "8": ["Ushpa Ushpa", "Las Rocas", "San Andrés", "Nueva Vera Cruz"],
    "9": ["Aguas Calientes", "San Antonio", "Villa Paraíso", "21 de Septiembre", "Pucara"],
    "15": ["Arrumani Agrario", "J.V. Copacabana"]
};

/* ZONAS */

selectZona.disabled = true;

selectDistrito.addEventListener("change", function () {

    const distrito = this.value;

    selectZona.innerHTML = '<option value="">Zona</option>';

    selectZona.disabled = !distrito;

    if (Zones_by_district[distrito]) {

        Zones_by_district[distrito].forEach(zona => {

            const option = document.createElement("option");

            option.value = zona;
            option.textContent = zona;

            selectZona.appendChild(option);

        });

    }

});

/* STORAGE */

function getServices() {
    return JSON.parse(localStorage.getItem("services")) || [];
}

function saveServices(services) {
    localStorage.setItem("services", JSON.stringify(services));
}

/* RENDER */

function createCard(service, index) {

    const article = document.createElement("article");

    article.className = "card";

    article.innerHTML = `
        <div class="card-status">

            <span class="status-dot ${
                service.status === "unavailable"
                    ? "offline"
                    : "online"
            }"></span>

            <span class="status-text">
                ${
                    service.status === "unavailable"
                        ? "Unavailable"
                        : "Available"
                }
            </span>

        </div>

        <p><strong>Distrito:</strong> ${service.distrito}</p>

        <p><strong>Zona:</strong> ${service.zone}</p>

        <p><strong>Día:</strong> ${service.day}</p>

        <p><strong>Hora:</strong> ${service.schedule}</p>

        <div class="rutas">

            <strong>Rutas:</strong>

            <p>${
                Array.isArray(service.listaRutas)
                    ? service.listaRutas.join(", ")
                    : service.listaRutas || "No routes"
            }</p>

        </div>

        <div class="actions">

            <button class="btn-edit">
                <i class="fas fa-pen"></i> Edit
            </button>

            <button class="btn-delete">
                <i class="fas fa-trash"></i> Delete
            </button>

        </div>
    `;

    article.querySelector(".btn-edit")
        .addEventListener("click", () => openEditModal(index));

    article.querySelector(".btn-delete")
        .addEventListener("click", () => openDeleteModal(index));

    return article;
}

function renderServices(services) {

    gridCards.innerHTML = "";

    if (services.length === 0) {

        gridCards.innerHTML = `
            <div class="empty-message">
                <h3>No services found</h3>
            </div>
        `;

        return;
    }

    services.forEach((service, index) => {

        const card = createCard(service, index);

        gridCards.appendChild(card);

    });

}

/* FILTER */

function filterServices() {

    const distrito = selectDistrito.value;
    const zona = selectZona.value;
    const dia = selectDia.value;
    const search = searchInput.value.toLowerCase();

    const services = getServices();

    const filtered = services.filter(service => {

        return (
            (!distrito || service.distrito === distrito) &&
            (!zona || service.zone === zona) &&
            (!dia || service.day.toLowerCase() === dia.toLowerCase()) &&
            (
                service.zone.toLowerCase().includes(search) ||
                service.distrito.toLowerCase().includes(search)
            )
        );

    });

    renderServices(filtered);

}

btnBuscar.addEventListener("click", filterServices);

/* EDIT MODAL */

function openEditModal(index) {

    const services = getServices();

    const service = services[index];

    currentEditIndex = index;

    editDistrito.value = service.distrito;
    /* LOAD ZONES */

    editZona.innerHTML = '<option value="">Zona</option>';

    if (Zones_by_district[service.distrito]) {

        Zones_by_district[service.distrito].forEach(zona => {

            const option = document.createElement("option");

            option.value = zona;
            option.textContent = zona;

            editZona.appendChild(option);

        });

    }

    /* SET VALUES */

    editDistrito.value = service.distrito;
    editZona.value = service.zone;
    editDia.value = service.day;
    editHorario.value = service.schedule;
    editStatus.value = service.status || "available";

    editRutas.value = Array.isArray(service.listaRutas)
        ? service.listaRutas.join(", ")
        : service.listaRutas;

    editModal.classList.add("active");

}

function closeEditModal() {
    editModal.classList.remove("active");
}

saveEdit.addEventListener("click", () => {

    const services = getServices();

    services[currentEditIndex] = {
        status: editStatus.value,
        ...services[currentEditIndex],

        distrito: editDistrito.value,

        zone: editZona.value,

        day: editDia.value,

        schedule: editHorario.value,

        listaRutas: editRutas.value
            .split(",")
            .map(ruta => ruta.trim())

    };

    saveServices(services);

    renderServices(services);

    closeEditModal();

});

cancelEdit.addEventListener("click", closeEditModal);

/* DELETE MODAL */

function openDeleteModal(index) {

    currentDeleteIndex = index;

    deleteModal.classList.add("active");

}

function closeDeleteModal() {

    deleteModal.classList.remove("active");

}

confirmDelete.addEventListener("click", () => {

    const services = getServices();

    services.splice(currentDeleteIndex, 1);

    saveServices(services);

    renderServices(services);

    closeDeleteModal();

});

cancelDelete.addEventListener("click", closeDeleteModal);

/* INITIAL */

renderServices(getServices());

/* SIDEBAR */

const sidebar = document.getElementById('sidebar');
const toggleBtn = document.getElementById('toggle-btn');

toggleBtn.addEventListener('click', () => {

    sidebar.classList.toggle('collapsed');

    const icon = toggleBtn.querySelector('i');

    if (sidebar.classList.contains('collapsed')) {
        icon.classList.replace('fa-chevron-left', 'fa-chevron-right');
    } else {
        icon.classList.replace('fa-chevron-right', 'fa-chevron-left');
    }

});

/* =========================
   EDIT MODAL ZONAS
========================= */

editDistrito.addEventListener("change", function () {

    const distrito = this.value;

    editZona.innerHTML = '<option value="">Zona</option>';

    if (Zones_by_district[distrito]) {

        Zones_by_district[distrito].forEach(zona => {

            const option = document.createElement("option");

            option.value = zona;
            option.textContent = zona;

            editZona.appendChild(option);

        });

    }

});