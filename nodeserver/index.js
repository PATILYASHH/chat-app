const io = require('socket.io')(8000);

const users = {}; // Object to store users

io.on('connection', socket => {
    socket.on('new-user-joined', name => {
        console.log("New user joined:", name);
        users[socket.id] = name; // Store user in the object with socket.id as key
        socket.broadcast.emit('user-joined', name); // Broadcast to all clients except the sender
    });

    socket.on('send-message', message => {
        socket.broadcast.emit('receive-message', { message: message, name: users[socket.id] });
    });

    socket.on('disconnect', () => {
        const userName = users[socket.id];
        if (userName) {
            delete users[socket.id];
            socket.broadcast.emit('user-left', userName);
            console.log(userName + ' left the chat');
        }
    });
});
