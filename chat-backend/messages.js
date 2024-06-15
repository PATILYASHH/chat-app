// For simplicity, managing messages in memory (replace with database in production)
let messages = [];

module.exports = {
    addMessage: (username, message) => {
        messages.push({ username, message, timestamp: new Date() });
    },
    getAllMessages: () => {
        return messages;
    }
};
