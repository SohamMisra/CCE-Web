document.addEventListener("DOMContentLoaded", function () {
    // Select all year tabs and content sections
    const yearTabs = document.querySelectorAll(".year-tab");
    const containers = document.querySelectorAll(".container");

    // Function to switch between years
    function switchYear(selectedYear) {
        containers.forEach(container => {
            if (container.getAttribute("data-year") === selectedYear) {
                container.style.display = "block";
            } else {
                container.style.display = "none";
            }
        });

        // Update the active tab styling
        yearTabs.forEach(tab => {
            if (tab.getAttribute("data-year") === selectedYear) {
                tab.classList.add("active");
            } else {
                tab.classList.remove("active");
            }
        });
    }

    // Add event listeners to each year tab
    yearTabs.forEach(tab => {
        tab.addEventListener("click", function () {
            const selectedYear = tab.getAttribute("data-year");
            switchYear(selectedYear);
        });
    });

    // Show the first year container by default
    switchYear(document.querySelector(".year-tab.active").getAttribute("data-year"));
});