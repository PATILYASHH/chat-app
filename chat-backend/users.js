// users.js

// For simplicity, managing users in memory (replace with database in production)
let users = [];

module.exports = {
    // Register a new user
    addUser: (username, password) => {
        // Check if username already exists
        if (users.find(user => user.username === username)) {
            throw new Error('Username already exists');
        }
        users.push({ username, password }); // Store username and password (in production, hash passwords)
    },

    // Authenticate user
    authenticateUser: (username, password) => {
        const user = users.find(user => user.username === username && user.password === password);
        return user ? true : false;
    },

    // Get user list (for demo purposes)
    getUserList: () => {
        return users.map(user => ({ username: user.username }));
    }
};
