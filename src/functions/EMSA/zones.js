const zonasPorDistrito = {
  "2": ["Barrio Policial", "Colquiri", "Ticti Norte"],
  "6": ["Alto Cochabamba"],
  "7": ["Villa Venezuela"],
  "8": ["Ushpa Ushpa", "Las Rocas", "San Andrés", "Nueva Vera Cruz"],
  "9": ["Aguas Calientes", "San Antonio", "Villa Paraíso", "21 de Septiembre", "Pucara"],
  "15": ["Arrumani Agrario", "J.V. Copacabana"]
};

const distritoSelect = document.getElementById("distrito");
const zonaSelect = document.getElementById("zona");

// desactivar al inicio
zonaSelect.disabled = true;

distritoSelect.addEventListener("change", function() {
  const distrito = this.value;

  // limpiar zonas
  zonaSelect.innerHTML = '<option value="">Selecciona zona</option>';

  // activar o desactivar
  zonaSelect.disabled = !distrito;

  if (zonasPorDistrito[distrito]) {
    zonasPorDistrito[distrito].forEach(zona => {
      const option = document.createElement("option");
      option.value = zona;
      option.textContent = zona;
      zonaSelect.appendChild(option);
    });
  }
});