// Login Validation
document.getElementById("loginForm")?.addEventListener("submit", function(event) {
  event.preventDefault();
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  if (username === "admin" && password === "12345") {
      alert("Login Successful!");
      window.location.href = "index.html"; // Redirect to home
  } else {
      alert("Invalid Credentials!");
  }
});

// Contact Form Validation
document.getElementById("contactForm")?.addEventListener("submit", function(event) {
  event.preventDefault();
  alert("Your message has been sent!");
});

