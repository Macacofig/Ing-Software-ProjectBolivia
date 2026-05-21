import { ModelUser, login_user } from "../Models/User.js";

document.addEventListener("DOMContentLoaded", () => {
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const loginBtn = document.getElementById("login-btn");
    const errorMsg = document.getElementById("error-msg");

    const model = new ModelUser();

    // Usuarios de prueba si no hay ninguno registrado
    if (model.getUsers().length === 0) {
        model.addUser("Ciudadano", "ciudadano@gmail.com", "1234", "citizen");
        model.addUser("Admin", "admin@emsa.com", "admin123", "emsa");
    }

    loginBtn.addEventListener("click", () => {
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        const result = login_user(email, password, model.getUsers());

        if (!result.success) {
            errorMsg.textContent = result.message;
            errorMsg.style.display = "block";
            return;
        }

        errorMsg.style.display = "none";

        if (result.role === "citizen") {
            localStorage.setItem("citizen_id", result.id);
            window.location.href = "user_home.html";
        } else if (result.role === "emsa") {
            window.location.href = "emsa_services.html";
        }
    });
});