// Check if user is logged in
function checkAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const currentPath = window.location.pathname.toLowerCase();
    
    // Get the file name from the path
    const fileName = currentPath.split('/').pop();
    
    // If not logged in and not on login or register page, redirect to login
    if (!isLoggedIn && 
        fileName !== 'login.html' && 
        fileName !== 'register.html') {
        window.location.href = 'login.html';
    }
    
    // If logged in and trying to access login or register page, redirect to index
    if (isLoggedIn && 
        (fileName === 'login.html' || fileName === 'register.html')) {
        window.location.href = 'index.html';
    }
}

// Get users from localStorage
function getUsers() {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
}

// Save users to localStorage
function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

// Handle login form submission
if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        const users = getUsers();
        const user = users.find(u => u.username === username && u.password === password);
        
        if (user) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('username', username);
            window.location.href = 'index.html';
        } else {
            alert('Invalid username or password');
        }
    });
}

// Handle registration form submission
if (document.getElementById('registerForm')) {
    document.getElementById('registerForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const mobile = document.getElementById('mobile').value;
        const email = document.getElementById('email').value;
        
        // Validate input
        if (!username || !password || !mobile || !email) {
            alert('Please fill in all fields');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Mobile validation (simple check for numbers only)
        const mobileRegex = /^\d+$/;
        if (!mobileRegex.test(mobile)) {
            alert('Please enter a valid mobile number (numbers only)');
            return;
        }
        
        const users = getUsers();
        
        // Check if username already exists
        if (users.some(u => u.username === username)) {
            alert('Username already exists');
            return;
        }
        
        // Add new user
        users.push({
            username,
            password,
            mobile,
            email
        });
        
        // Save updated users list
        saveUsers(users);
        
        alert('Registration successful! Please login.');
        window.location.href = 'login.html';
    });
}

// Initialize
checkAuth(); 