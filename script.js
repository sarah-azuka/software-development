// =========================================
// SELECT HTML ELEMENTS
// =========================================

const menuBtn = document.getElementById("menuBtn");

const navLinks = document.getElementById("navLinks");

const navigationLinks = document.querySelectorAll(".nav-links a");

const filterButtons = document.querySelectorAll(".filter-btn");

const projectCards = document.querySelectorAll(".project-card");

const year = document.getElementById("year");

// =========================================
// MOBILE NAVIGATION
// =========================================

menuBtn.addEventListener("click", function () {
  // Show or hide navigation

  navLinks.classList.toggle("show");

  // Check if menu is open

  const menuIsOpen = navLinks.classList.contains("show");

  // Update accessibility information

  menuBtn.setAttribute("aria-expanded", menuIsOpen);

  // Change menu icon

  if (menuIsOpen) {
    menuBtn.textContent = "✕";
  } else {
    menuBtn.textContent = "☰";
  }
});

// =========================================
// CLOSE MENU WHEN LINK IS CLICKED
// =========================================

navigationLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    navLinks.classList.remove("show");

    menuBtn.textContent = "☰";

    menuBtn.setAttribute("aria-expanded", "false");
  });
});

// =========================================
// PROJECT FILTERING
// =========================================

filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    // Get selected category

    const selectedFilter = button.getAttribute("data-filter");

    // Remove active state from
    // all filter buttons

    filterButtons.forEach(function (btn) {
      btn.classList.remove("active");
    });

    // Add active state to
    // clicked button

    button.classList.add("active");

    // Loop through projects

    projectCards.forEach(function (project) {
      // Get project categories

      const categories = project.getAttribute("data-category").split(" ");

      // Check whether project
      // belongs to selected category

      if (selectedFilter === "all" || categories.includes(selectedFilter)) {
        project.classList.remove("hide");
      } else {
        project.classList.add("hide");
      }
    });
  });
});

// =========================================
// AUTOMATIC COPYRIGHT YEAR
// =========================================

year.textContent = new Date().getFullYear();

// =========================================
// SCROLL REVEAL ANIMATION
// =========================================

// Select elements we want to animate

const revealElements = document.querySelectorAll(
  ".section-heading, " +
    ".about-text, " +
    ".about-card, " +
    ".skill-card, " +
    ".project-card, " +
    ".experience-card",
);

// Add reveal class

revealElements.forEach(function (element) {
  element.classList.add("reveal");
});

// Create Intersection Observer

const observer = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        // Stop observing after
        // animation occurs

        observer.unobserve(entry.target);
      }
    });
  },

  {
    threshold: 0.1,
  },
);

// Observe every reveal element

revealElements.forEach(function (element) {
  observer.observe(element);
});

// =========================================
// ACTIVE NAVIGATION LINK
// =========================================

const pageSections = document.querySelectorAll("main section[id]");

window.addEventListener("scroll", function () {
  let currentSection = "";

  pageSections.forEach(function (section) {
    const sectionTop = section.offsetTop;

    const sectionHeight = section.clientHeight;

    if (window.scrollY >= sectionTop - 150) {
      currentSection = section.getAttribute("id");
    }
  });

  navigationLinks.forEach(function (link) {
    link.classList.remove("active-link");

    if (link.getAttribute("href") === "#" + currentSection) {
      link.classList.add("active-link");
    }
  });
});

// =========================================
// CLOSE MOBILE MENU IF SCREEN GETS LARGER
// =========================================

window.addEventListener("resize", function () {
  if (window.innerWidth > 700) {
    navLinks.classList.remove("show");

    menuBtn.textContent = "☰";

    menuBtn.setAttribute("aria-expanded", "false");
  }
});
