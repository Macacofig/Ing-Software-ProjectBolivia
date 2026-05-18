import { ModelUser, login_user } from "../../Models/User.js";

document.addEventListener("DOMContentLoaded", () => {
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const loginBtn = document.getElementById("login-btn");
    const errorMessage = document.getElementById("error-message");

    const model = new ModelUser();
    model.loadUsers();

    // Usuario de prueba si no hay ninguno
    if (model.getUsers().length === 0) {
        model.addUser({ id: 1, nombre: "Ciudadano", correo: "ciudadano@gmail.com", password: "1234", role: "citizen" });
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

        // Guardar id del ciudadano para los reportes
        localStorage.setItem("citizen_id", result.id);
        window.location.href = "user_home.html";
    });
});