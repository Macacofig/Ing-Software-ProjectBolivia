/**
 * Inyecta el sidebar correspondiente y maneja su lógica visual
 * @param {string} type - 'emsa' o 'citizen'
 * @param {string} activeMenuId - ID del elemento del menú que debe estar resaltado
 */
export async function loadSidebar(type, activeMenuId) {
  const container = document.getElementById('sidebar-container');
  if (!container) return;

  // Parcel permite importar recursos estáticos usando URL
  const url = type === 'emsa' 
    ? new URL('../../components/emsa_sidebar.html', import.meta.url)
    : new URL('../../components/citizen_sidebar.html', import.meta.url);

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

    // Activar el botón de colapsar
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
      sidebar.classList.toggle('collapsed');
      toggleBtn.textContent = sidebar.classList.contains('collapsed') ? "▶" : "◀";
    });
  }
}