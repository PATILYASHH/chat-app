document.getElementById('send-button').addEventListener('click', sendMessage);
document.getElementById('message-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value.trim();
    
    if (message === '') {
        return;
    }

    // Send message to the server (simulated for this example)
    fetch('/api/send-message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to send message');
        }
        return response.json();
    })
    .then(data => {
        // Successfully sent message
        displayMessage(message, true); // true for sent message
    })
    .catch(error => {
        console.error('Error sending message:', error);
        alert('Failed to send message. Please try again.');
    });

    messageInput.value = '';
    messageInput.focus();
}

// Function to display messages
function displayMessage(message, sent = false) {
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('message');
    if (sent) {
        messageContainer.classList.add('sent');
    }
    messageContainer.textContent = message;

    document.getElementById('chat-messages').appendChild(messageContainer);

    // Scroll to the bottom of the chat messages
    const chatMessages = document.getElementById('chat-messages');
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Function to fetch messages from the server (simulated for this example)
function fetchMessages() {
    fetch('/api/get-messages')
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch messages');
        }
        return response.json();
    })
    .then(data => {
        // Display messages on the chat interface
        data.messages.forEach(message => {
            displayMessage(message);
        });
    })
    .catch(error => {
        console.error('Error fetching messages:', error);
        alert('Failed to fetch messages. Please refresh the page.');
    });
}

// Fetch messages initially and every 5 seconds (simulated polling)
fetchMessages();
setInterval(fetchMessages, 5000); // Polling every 5 seconds
