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