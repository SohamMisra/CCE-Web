const toggleButton = document.getElementById("darkModeToggle");
const body = document.body;

// Check user preference from localStorage
if (localStorage.getItem("dark-mode") === "enabled") {
    body.classList.add("dark-mode");
    toggleButton.innerText = "☀️ Light Mode";
}

// Toggle Dark Mode
toggleButton.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    // Save user preference
    if (body.classList.contains("dark-mode")) {
        localStorage.setItem("dark-mode", "enabled");
        toggleButton.innerText = "☀️ Light Mode";
    } else {
        localStorage.setItem("dark-mode", "disabled");
        toggleButton.innerText = "🌙 Dark Mode";
    }
});