(function () {
    // Show whichever section matches the given id (e.g. "portfolio"),
    // and mark the matching nav dot as active.
    function activateSection(id) {
        const targetSection = document.getElementById(id);
        const targetButton = document.querySelector(`.control[data-id="${id}"]`);

        // Fall back to "home" if the id doesn't match a real section
        if (!targetSection || !targetButton) {
            activateSection("home");
            return;
        }

        const currentActive = document.querySelector(".active");
        if (currentActive) currentActive.classList.remove("active");

        const currentActiveBtn = document.querySelector(".active-btn");
        if (currentActiveBtn) currentActiveBtn.classList.remove("active-btn");

        targetSection.classList.add("active");
        targetButton.classList.add("active-btn");
    }

    [...document.querySelectorAll(".control")].forEach(button => {
        button.addEventListener("click", function () {
            // Update the URL — this is what lets refresh/direct links work
            window.location.hash = button.dataset.id;
        });
    });

    // Whenever the hash changes (nav click, back/forward, typed URL), update the view
    window.addEventListener("hashchange", () => {
        const id = window.location.hash.replace("#", "") || "home";
        activateSection(id);
    });

    // On first load, show whatever section the URL points to (or home if none)
    const initialId = window.location.hash.replace("#", "") || "home";
    activateSection(initialId);

    document.querySelector(".theme-btn").addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
    })
})();