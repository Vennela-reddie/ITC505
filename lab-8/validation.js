document.getElementById("registrationForm").addEventListener("submit", function(event) {
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    let isValid = true;
    let errorMessage = "";

    // Check for empty fields
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
        errorMessage += "All fields are required.\n";
        isValid = false;
    }

    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailPattern.test(email)) {
        errorMessage += "Please enter a valid email address.\n";
        isValid = false;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
        errorMessage += "Passwords do not match.\n";
        isValid = false;
    }

    if (!isValid) {
        alert(errorMessage);
        event.preventDefault();
    }
});
