/**
 * Inyecta el sidebar correspondiente y maneja su lógica visual
 * @param {string} type - 'emsa' o 'citizen'
 * @param {string} activeMenuId - ID del elemento del menú que debe estar resaltado
 */
export async function loadSidebar(type, activeMenuId) {
  const container = document.getElementById('sidebar-container');
  if (!container) return;

  // Declaramos ambas URLs de forma estática para que Parcel las detecte sin problemas
  const emsaUrl = new URL('../components/emsa_sidebar.html', import.meta.url);
  const citizenUrl = new URL('../components/citizen_sidebar.html', import.meta.url);

  // Elegimos la ruta correcta según el parámetro
  const url = type === 'emsa' ? emsaUrl : citizenUrl;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Error al cargar el sidebar');
    
    const htmlText = await response.text();
    container.innerHTML = htmlText;

    // Resaltar el botón activo en el menú
    const activeItem = document.getElementById(activeMenuId);
    if (activeItem) {
      activeItem.classList.add('active');
    }

    // Activar la funcionalidad de colapsar e interactuar con el Grid
    setupToggle();

  } catch (error) {
    console.error("Fallo la carga del sidebar dinámico:", error);
  }
}

function setupToggle() {
  const sidebar = document.getElementById('appSidebar');
  const toggleBtn = document.getElementById('toggleSidebar');

  if (sidebar && toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      // 1. Contraemos o expandimos el sidebar visualmente
      sidebar.classList.toggle('collapsed');
      
      // 2. Cambiamos el ícono de la flecha según el estado del colapso
      toggleBtn.textContent = sidebar.classList.contains('collapsed') ? "▶" : "◀";
    });
  }
}