import {
    saveServicesToLocalStorage,
    getServices
} from "../utils/localStorage.js";

// ==================================================
// USER CLASS
// ==================================================

class User {

    constructor(
        id,
        name,
        email,
        password,
        role = "citizen"
    ) {

        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;

    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getEmail() {
        return this.email;
    }

    getPassword() {
        return this.password;
    }

    getRole() {
        return this.role;
    }

    toJSON() {

        return {

            id: this.id,
            name: this.name,
            email: this.email,
            password: this.password,
            role: this.role

        };

    }

}

// ==================================================
// MODEL USER
// ==================================================

class ModelUser {

    constructor() {

        this.users = [];

        this.loadUsers();

    }

    loadUsers() {

        const usersData =
            getServices("users") || [];

        this.users = usersData.map(
            user =>
                new User(
                    this.generateUserId(),
                    user.name,
                    user.email,
                    user.password,
                    user.role
                )
        );

    }

    getUsers() {

        return this.users;

    }

    addUser(
        name,
        email,
        password,
        role
    ) {

        const newUser =
            new User(
                this.generateUserId(),
                name,
                email,
                password,
                role
            );

        this.users.push(newUser);

        this.saveUsers();

        return {

            success: true,

            message:
                "Usuario registrado correctamente"

        };

    }

    saveUsers() {

        const usersJSON =
            this.users.map(
                user => user.toJSON()
            );

        saveServicesToLocalStorage(
            usersJSON,
            "users"
        );

    }

    generateUserId() {

        if (this.users.length === 0) {

            return 1;

        }

        const ids = this.users
            .map(user => user.getId())
            .sort((a, b) => a - b);

        return ids[ids.length - 1] + 1;

    }
}

function verify_emsa_key(key) {

    const EMSA_KEY = "EMSA-2026";

    if (key !== EMSA_KEY) return { field: "key",message:"Llave EMSA incorrecta"};

    return {success: true};

}

function isDuplicateUser(
    user,
    usersList
) {

    return usersList.some(
        u =>
            u.email === user.email
    );

}

function verify_user(
    user,
    usersList = []
) {

    if (!user.name) return {field: "name",message:"Ingresa un nombre"};
    if (!user.email) return {field: "email",message:"Ingresa un correo"};
    if (!user.password) return {field: "password",message:"Ingresa una contraseña"};
    if (!user.role) return {field: "role",message:"Selecciona un rol"};
    if (user.role === "emsa") 
    {
        if (!user.key) return {field: "key",message:"Ingresa la llave EMSA"};
        const verifyKey = verify_emsa_key(user.key);
        if (!verifyKey.success) return verifyKey;
    }

    if (isDuplicateUser(user,usersList)) return {field: "email",message:"El correo ya existe"};

    return {success: true};

}

export {
    User,
    ModelUser,
    verify_user
};