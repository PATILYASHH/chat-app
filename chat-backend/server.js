// server.js

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const users = require('./users');
const messages = require('./messages');

const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json()); // Parse JSON bodies
app.use(express.static('public')); // Serve static files if any (e.g., index.html)

// Register a new user
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    try {
        users.addUser(username, password);
        res.status(201).send('User registered successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Authenticate user
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (users.authenticateUser(username, password)) {
        res.status(200).send('Login successful');
    } else {
        res.status(401).send('Invalid username or password');
    }
});

// Socket.io setup (real-time chat)
io.on('connection', (socket) => {
    console.log('A user connected');

    // Send existing messages to the new user
    socket.emit('init', messages.getAllMessages());

    // Handle new messages from clients
    socket.on('message', (data) => {
        const { username, message } = data;
        messages.addMessage(username, message);
        io.emit('message', { username, message }); // Broadcast message to all connected clients
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
