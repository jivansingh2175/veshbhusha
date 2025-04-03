document.addEventListener("DOMContentLoaded", function () {
    // Signup form handling
    const signupForm = document.getElementById("signup-form");
    
    if (signupForm) {
        signupForm.addEventListener("submit", function (e) {
            e.preventDefault();
            
            const username = document.getElementById("signup-username").value;
            const email = document.getElementById("signup-email").value;
            const password = document.getElementById("signup-password").value;
  
            // Email validation regex
            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            
            if (!emailPattern.test(email)) {
                alert("Invalid email address! Please enter a valid email.");
                return;
            }
  
            // Storing user data in localStorage (for demo purposes)
            localStorage.setItem("user", JSON.stringify({ username, email, password }));
            alert("Signup successful! You can now log in.");
            window.location.href = "index.html";
        });
    }
  
  

  // Login form handling
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
      loginForm.addEventListener("submit", function (e) {
          e.preventDefault();
          const username = document.getElementById("login-username").value;
          const password = document.getElementById("login-password").value;

          // Retrieve stored user data
          const storedUser = JSON.parse(localStorage.getItem("user"));

          if (storedUser && storedUser.username === username && storedUser.password === password) {
              alert("Login successful!");
              window.location.href = "dashboard.html"; // Redirect to another page after login
          } else {
              alert("Invalid username or password!");
          }
      });
  }
});
