(function () {
  "use strict";

  const projectsGrid = document.getElementById("projectsGrid");
  const yearEl = document.getElementById("year");
  const themeToggle = document.getElementById("themeToggle");
  const html = document.documentElement;
  const themeIcon = document.getElementById("themeIcon");
  const lightIcon = themeIcon ? themeIcon.querySelector("#lightIcon") : null;
  const darkIcon = themeIcon ? themeIcon.querySelector("#darkIcon") : null;

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Theme persistence
  try {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      html.setAttribute("data-bs-theme", "dark");
    }
    if (savedTheme === "light") {
      html.setAttribute("data-bs-theme", "light");
    }
  } catch (e) {}

  function updateThemeIcon() {
    const current = html.getAttribute("data-bs-theme") || "light";
    const isDark = current === "dark";
    if (lightIcon) {
      lightIcon.style.display = isDark ? "none" : "";
    }
    if (darkIcon) {
      darkIcon.style.display = isDark ? "" : "none";
    }
  }

  function setTheme(next) {
    html.setAttribute("data-bs-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch (e) {}
    updateThemeIcon();
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      const current = html.getAttribute("data-bs-theme") || "light";
      const next = current === "light" ? "dark" : "light";
      setTheme(next);
    });
  }

  // Load projects.json and render cards
  async function loadProjects() {
    try {
      const res = await fetch("projects.json", { cache: "no-cache" });
      const data = await res.json();
      renderProjects(data.projects || []);
    } catch (err) {
      console.error("Failed to load projects.json", err);
    }
  }

  function renderProjects(projects) {
    if (!projectsGrid) return;
    projectsGrid.innerHTML = "";
    projects.forEach(function (p) {
      const col = document.createElement("div");
      col.className = "col-12 col-md-6 col-lg-4";

      const featureImg = p.featureImage || "";
      const card = document.createElement("div");
      card.className = "card h-100 shadow-sm";
      card.innerHTML =
        (featureImg
          ? '<img class="card-img-top" alt="' +
            escapeHtml(p.name) +
            ' feature" loading="lazy" src="' +
            encodeURI(featureImg) +
            '"/>'
          : "") +
        '<div class="card-body d-flex flex-column">' +
        '<h3 class="h5">' +
        escapeHtml(p.name) +
        "</h3>" +
        '<p class="text-body-secondary">' +
        escapeHtml(p.description || "") +
        "</p>" +
        // Website link separated to stand out
        (p.link
          ? '<div class="mb-3"><a class="btn btn-sm btn-primary w-100" target="_blank" rel="noopener" href="' +
            encodeURI(p.link) +
            '">فتح الموقع</a></div>'
          : "") +
        '<p class="mb-1">صور الموقع:</p><div class="mt-auto d-flex flex-wrap gap-2 image-buttons-container">' +
        "</div>" +
        "</div>";

      // Dynamically add buttons only for categories that have images
      const imageButtonsContainer = card.querySelector(".image-buttons-container");
      if (imageButtonsContainer) {
        const buttonLabels = {
          mobile: "الموبايل",
          desktop: "الكمبيوتر",
          admin: "الإدارة",
        };
        const images = p.images || {};
        Object.keys(buttonLabels).forEach(function (group) {
          if (images[group] && Array.isArray(images[group]) && images[group].length > 0) {
            const btn = document.createElement("button");
            btn.className = "btn btn-sm btn-outline-primary";
            btn.setAttribute("data-group", group);
            btn.textContent = buttonLabels[group];
            btn.addEventListener("click", function () {
              openImagesModal(p, group);
            });
            imageButtonsContainer.appendChild(btn);
          }
        });
      }

      col.appendChild(card);
      projectsGrid.appendChild(col);
    });
  }

  // Modal + Carousel population on demand
  const imagesModalEl = document.getElementById("imagesModal");
  const imagesModalTitle = document.getElementById("imagesModalTitle");
  const imagesCarouselInner = document.getElementById("imagesCarouselInner");
  let bsModal = null;
  if (imagesModalEl) {
    bsModal = new bootstrap.Modal(imagesModalEl);
  }

  function openImagesModal(project, group) {
    if (!bsModal || !imagesCarouselInner || !imagesModalTitle) return;
    const titleMap = {
      mobile: "Mobile Screens",
      desktop: "Desktop Screens",
      admin: "Admin Panel Screens",
    };
    imagesModalTitle.textContent = project.name;
    imagesCarouselInner.innerHTML = "";

    const images = (project.images || {})[group] || [];
    if (images.length === 0) {
      imagesCarouselInner.innerHTML =
        '<div class="text-center py-5 text-body-secondary">No images available.</div>';
    } else {
      images.forEach(function (src, idx) {
        const item = document.createElement("div");
        item.className = "carousel-item" + (idx === 0 ? " active" : "");
        const img = document.createElement("img");
        img.className = "d-block w-100";
        img.setAttribute("alt", project.name + " " + group + " " + (idx + 1));
        img.setAttribute("loading", "lazy");
        // Lazy assign src at creation time (on-demand show), not at page load
        img.src = src;
        item.appendChild(img);
        imagesCarouselInner.appendChild(item);
      });
    }
    bsModal.show();
  }

  function escapeHtml(str) {
    return String(str || "").replace(/[&<>"]/g, function (s) {
      switch (s) {
        case "&":
          return "&amp;";
        case "<":
          return "&lt;";
        case ">":
          return "&gt;";
        case '"':
          return "&quot;";
        default:
          return s;
      }
    });
  }

  // Kick off
  updateThemeIcon();
  loadProjects();
})();
