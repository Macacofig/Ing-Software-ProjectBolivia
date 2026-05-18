import { ModelUser, login_user } from "../../Models/User.js";

document.addEventListener("DOMContentLoaded", () => {
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const loginBtn = document.getElementById("login-btn");
    const errorMessage = document.getElementById("error-message");

    const model = new ModelUser();
    model.loadUsers();

    // Admin de prueba si no hay ninguno
    if (model.getUsers().length === 0) {
        model.addUser({ id: 1, nombre: "Admin", correo: "admin@emsa.com", password: "admin123", role: "admin" });
        model.saveUsers();
    }

    loginBtn.addEventListener("click", () => {
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        const result = login_user(email, password, model.getUsers());

        if (!result.success) {
            errorMessage.textContent = result.message;
            errorMessage.style.display = "block";
            return;
        }

        window.location.href = "emsa_services.html";
    });
});
