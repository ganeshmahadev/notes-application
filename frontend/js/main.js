// main.js

// Check if user is authenticated
function checkAuth() {
    const token = localStorage.getItem('token');
    if (!token) {
        // If no token, redirect to login page
        window.location.href = 'index.html';
    }
}

// Logout function to clear token and redirect to login page
function logout() {
    localStorage.removeItem('token');
    window.location.href = 'index.html';
}

// Event listener to logout when clicking the logout button
document.addEventListener('DOMContentLoaded', function() {
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', logout);
    }
});

// Call checkAuth on pages where authentication is required
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname !== '/index.html' && window.location.pathname !== '/register.html') {
        checkAuth();
    }
});
