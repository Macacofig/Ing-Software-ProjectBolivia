import { getServices, saveServicesToLocalStorage } from "../utils/localStorage.js";

class User {
    constructor(id, nombre, correo, password, role) {
        this.id = id;
        this.nombre = nombre;
        this.correo = correo;
        this.password = password;
        this.role = role;
    }
    toJSON() {
        return {
            id: this.id,
            nombre: this.nombre,
            correo: this.correo,
            password: this.password,
            role: this.role
        };
    }
}

class ModelUser {
    constructor() {
        this.users = [];
    }
    addUser(userData) {
        this.users.push(new User(
            userData.id,
            userData.nombre,
            userData.correo,
            userData.password,
            userData.role
        ));
    }
    getUsers() {
        return this.users;
    }
    saveUsers() {
        saveServicesToLocalStorage(
            this.users.map(u => u.toJSON()),
            'users'
        );
    }
    loadUsers() {
        const data = getServices('users') || [];
        this.users = data.map(u => new User(
            u.id, u.nombre, u.correo, u.password, u.role
        ));
    }
}

function login_user(email, password, users = []) {
    if (!email || !password) {
        return { success: false, message: "Email y contraseña requeridos" };
    }
    const user = users.find(u => u.correo === email && u.password === password);
    if (!user) {
        return { success: false, message: "Credenciales incorrectas" };
    }
    return { success: true, role: user.role, id: user.id };
}

export { User, ModelUser, login_user };