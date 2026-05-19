import { ModelUser } from '../Models/ModelUser.js';
import { User } from '../Models/User.js';

export class UserProfilePresenter {
  constructor() {
    this.modelUser = new ModelUser();
    this.init();
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      this.mostrarDatosUsuario();
      this.bindEvents();
    });
  }

  bindEvents() {
    const editForm = document.getElementById('edit-profile-form');
    if (editForm) {
      editForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.onEditarPerfilClicked();
      });
    }
  }

  mostrarDatosUsuario() {
    const user = this.modelUser.getCurrentUser();
    if (user) {
      const usernameInput = document.getElementById('username');
      const emailInput = document.getElementById('email');
      const passwordInput = document.getElementById('password');

      if (usernameInput) usernameInput.value = user.username || '';
      if (emailInput) emailInput.value = user.email || '';
      if (passwordInput) passwordInput.value = user.password || '';
    } else {
      this.mostrarMensajeError('No se pudo cargar la información del usuario.');
    }
  }

  onEditarPerfilClicked() {
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!username || !email || !password) {
      this.mostrarMensajeError('Por favor, completa todos los campos.');
      return;
    }

    const currentUserId = this.modelUser.getCurrentUserId();
    if (!currentUserId) {
      this.mostrarMensajeError('Sesión inválida. Por favor, inicia sesión nuevamente.');
      return;
    }

    const updatedUser = new User(currentUserId, username, email, password);
    const success = this.modelUser.update(updatedUser);

    if (success) {
      this.mostrarMensajeExito('Perfil actualizado correctamente.');
      // Opcional: Actualizar el nombre en el sidebar si está presente
      const sidebarUserName = document.querySelector('.user-name');
      if (sidebarUserName) {
        sidebarUserName.textContent = username;
      }
    } else {
      this.mostrarMensajeError('Ocurrió un error al intentar actualizar el perfil.');
    }
  }

  mostrarMensajeExito(mensaje) {
    const messageContainer = document.getElementById('message-container');
    if (messageContainer) {
      messageContainer.textContent = mensaje;
      messageContainer.className = 'message success show';
      setTimeout(() => {
        messageContainer.className = 'message';
      }, 3000);
    } else {
      alert(`Éxito: ${mensaje}`);
    }
  }

  mostrarMensajeError(mensaje) {
    const messageContainer = document.getElementById('message-container');
    if (messageContainer) {
      messageContainer.textContent = mensaje;
      messageContainer.className = 'message error show';
      setTimeout(() => {
        messageContainer.className = 'message';
      }, 3000);
    } else {
      alert(`Error: ${mensaje}`);
    }
  }
}

// Inicializar el presentador
new UserProfilePresenter();
