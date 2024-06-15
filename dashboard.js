// dashboard.js

document.addEventListener('DOMContentLoaded', function() {
    const logoutButton = document.getElementById('logoutButton');
    const messageForm = document.getElementById('messageForm');
    const messageInput = document.getElementById('messageInput');
    const chatMessages = document.getElementById('chatMessages');

    // Function to display messages in chatMessages div
    function displayMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        chatMessages.appendChild(messageElement);
    }

    // Event listener for logout button
    logoutButton.addEventListener('click', function() {
        localStorage.removeItem('rememberedUsername'); // Remove remembered username if any
        window.location.href = 'index.html'; // Redirect back to login page
    });

    // Event listener for message form submission
    messageForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission

        const message = messageInput.value.trim();
        if (message !== '') {
            // Simulate sending message (replace with actual sending logic)
            displayMessage(`Me: ${message}`);
            messageInput.value = ''; // Clear input after sending
        }
    });

    // Simulated receiving a message (for demonstration)
    setTimeout(function() {
        displayMessage('Friend: Hello! How are you?');
    }, 2000);
});
