import { User } from './User.js';

export class ModelUser {
  constructor() {
    this.storageKey = 'users'; // Key where users might be stored
    this.currentUserKey = 'currentUser'; // Key for the logged-in user ID or object
  }

  getCurrentUserId() {
    // Attempt to get user ID from SessionStorage or LocalStorage
    const userId = sessionStorage.getItem('currentUserId') || localStorage.getItem('currentUserId');
    if (!userId) {
      // Fallback if the app stores the whole user object
      const userObjStr = sessionStorage.getItem('user') || localStorage.getItem('user');
      if (userObjStr) {
        try {
          const userObj = JSON.parse(userObjStr);
          return userObj.id;
        } catch (e) {
          console.error("Error parsing user from storage", e);
        }
      }
    }
    return userId;
  }

  getCurrentUser() {
    const userId = this.getCurrentUserId();
    if (!userId) return null;

    // Simulate fetching from a list of users, or if stored directly as 'user'
    const usersStr = localStorage.getItem(this.storageKey);
    if (usersStr) {
      try {
        const users = JSON.parse(usersStr);
        const userData = users.find(u => String(u.id) === String(userId));
        if (userData) {
          return new User(userData.id, userData.username, userData.email, userData.password);
        }
      } catch (e) {
        console.error("Error parsing users from local storage", e);
      }
    }

    // Fallback: Check if the user is stored directly under 'user' key
    const userObjStr = sessionStorage.getItem('user') || localStorage.getItem('user');
    if (userObjStr) {
      try {
        const u = JSON.parse(userObjStr);
        return new User(u.id, u.username, u.email, u.password);
      } catch (e) {
        console.error("Error parsing user from storage", e);
      }
    }

    // Default mock user if none found in storage for testing purposes
    return new User(userId, 'Usuario Demo', 'demo@email.com', 'password123');
  }

  update(updatedUser) {
    if (!updatedUser || !updatedUser.id) return false;

    try {
      // 1. Update in the users list
      const usersStr = localStorage.getItem(this.storageKey);
      if (usersStr) {
        let users = JSON.parse(usersStr);
        const index = users.findIndex(u => String(u.id) === String(updatedUser.id));
        if (index !== -1) {
          // Merge updates to preserve other possible fields
          users[index] = { ...users[index], username: updatedUser.username, email: updatedUser.email, password: updatedUser.password };
          localStorage.setItem(this.storageKey, JSON.stringify(users));
        } else {
          // User not found in list, might be isolated
        }
      }

      // 2. Update the 'user' object if it's stored directly
      const userObjStr = sessionStorage.getItem('user') || localStorage.getItem('user');
      if (userObjStr) {
        let u = JSON.parse(userObjStr);
        if (String(u.id) === String(updatedUser.id)) {
          u = { ...u, username: updatedUser.username, email: updatedUser.email, password: updatedUser.password };
          // Save back where it came from
          if (sessionStorage.getItem('user')) sessionStorage.setItem('user', JSON.stringify(u));
          if (localStorage.getItem('user')) localStorage.setItem('user', JSON.stringify(u));
        }
      }

      return true; // Success
    } catch (e) {
      console.error("Error updating user", e);
      return false; // Failure
    }
  }
}
