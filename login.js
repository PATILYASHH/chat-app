document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way
    
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    
    if (username === 'yash' && password === 'yash') {
        // Redirect to the dashboard.html located in the dashboard folder
        window.location.href = 'dashboard.html';
    } else {
        alert('Invalid username or password.');
    }
});
