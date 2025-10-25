

document.getElementById("learnMoreBtn").addEventListener("click", () => {
  alert("More features coming soon — including stop combinations and audio playback!");
});

// Fade-in when the page loads
window.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("fade-in");
});

// Smooth fade-out when navigating links
document.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", e => {
    const href = link.getAttribute("href");

    // Only apply effect to internal links
    if (href && !href.startsWith("http") && !href.startsWith("#")) {
      e.preventDefault();
      document.body.classList.remove("fade-in");
      setTimeout(() => {
        window.location.href = href;
      }, 500); // matches the CSS transition time
    }
  });
});

document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault(); // prevent the page from reloading

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const message = document.getElementById("loginMessage");

  if (username === "admin" && password === "organ123") {
    message.textContent = "Welcome back, " + username + "!";
  } else {
    message.textContent = "Invalid username or password.";
  }
});

const loginBtn = document.getElementById("loginBtn");

// Check login status on page load
let isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
updateLoginButton();

// Handle click on login/logout
loginBtn.addEventListener("click", () => {
  if (isLoggedIn) {
    // Log out
    localStorage.setItem("isLoggedIn", "false");
    isLoggedIn = false;
    updateLoginButton();
    alert("You’ve been logged out.");
  } else {
    // Show login form
    document.querySelector(".login").scrollIntoView({ behavior: "smooth" });
  }
});

// Helper function to update button text
function updateLoginButton() {
  loginBtn.textContent = isLoggedIn ? "Logout" : "Login";
}

document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("loginBtn");
  if (loginBtn) {
    loginBtn.addEventListener("click", () => {
      window.location.href = "login.html";
    });
  }
});
