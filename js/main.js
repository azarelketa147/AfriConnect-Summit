// ==== Dark Mode ==== //
const themeButton = document.getElementById("theme-toggle");
const themeIcon = themeButton.querySelector("i");
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    themeIcon.className = "bi bi-sun-fill";
}

themeButton.addEventListener("click", () => {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";

    if (isDark) {
        document.documentElement.removeAttribute("data-theme");
        localStorage.setItem("theme", "light");
        themeIcon.className = "bi bi-moon-fill";
    } else {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
        themeIcon.className = "bi bi-sun-fill";
    }
});

// ======= Navbar Scroll ======== //
const header = document.querySelector("header");
window.addEventListener("scroll", () => {
    if (window.scrollY > 80) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

// ======= Retour en haut ======== //
const topButton = document.getElementById("back-to-top");
window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        topButton.style.display = "flex";
    } else {
        topButton.style.display = "none";
    }
});
if (topButton) {
    topButton.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

// =========  Menu Hamburger ========= //
const menuButton = document.getElementById("menu-toggle");
const menu = document.querySelector("nav ul");
if (menuButton) {
    menuButton.addEventListener("click", () => {
        menu.classList.toggle("open");
    });
}

// ============== Compte à rebours ============== //
const dateEvenement = new Date("November 15, 2026 09:00:00").getTime();

function compteur() {
    const joursEl = document.getElementById("jours");
    if (!joursEl) return; // le compte à rebours n'existe que sur index.html

    const maintenant = new Date().getTime();
    const difference = dateEvenement - maintenant;

    if (difference < 0) {
        document.getElementById("jours").textContent = "0";
        document.getElementById("heures").textContent = "0";
        document.getElementById("minutes").textContent = "0";
        document.getElementById("secondes").textContent = "0";
        return;
    }

    const jours = Math.floor(difference / (1000 * 60 * 60 * 24));
    const heures = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const secondes = Math.floor((difference % (1000 * 60)) / 1000);

    document.getElementById("jours").textContent = jours;
    document.getElementById("heures").textContent = heures;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("secondes").textContent = secondes;
}
setInterval(compteur, 1000);
compteur();

// ======= Programme.html - onglets 3 jours   ======== //
const tabButtons = document.querySelectorAll(".tab-btn");
const dayPanels = document.querySelectorAll(".day-panel");

tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        tabButtons.forEach((b) => b.classList.remove("active"));
        dayPanels.forEach((p) => p.classList.remove("active"));

        btn.classList.add("active");
        document.getElementById(btn.dataset.day).classList.add("active");
    });
});

// ======== Intervenants.html - filtrage dynamique ======== //
const filterButtons = document.querySelectorAll(".filter-btn");
const speakerCards = document.querySelectorAll(".speaker-card");

filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        filterButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        const theme = btn.dataset.filter;

        speakerCards.forEach((card) => {
            if (theme === "tous" || card.dataset.theme === theme) {
                card.classList.remove("hidden");
            } else {
                card.classList.add("hidden");
            }
        });
    });
});

// ======= Contact.html - validation du formulaire + FAQ (FAQ = CSS pur) ======== //
const inscriptionForm = document.getElementById("inscription-form");

function setFieldState(input, errorEl, isValid, message) {
    if (isValid) {
        input.classList.add("valid");
        input.classList.remove("invalid");
        errorEl.textContent = "";
    } else {
        input.classList.add("invalid");
        input.classList.remove("valid");
        errorEl.textContent = message;
    }
    return isValid;
}

if (inscriptionForm) {
    inscriptionForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const nom = document.getElementById("nom");
        const email = document.getElementById("email");
        const telephone = document.getElementById("telephone");
        const participation = document.getElementById("participation");
        const pays = document.getElementById("pays");
        const message = document.getElementById("message");

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        let valid = true;

        valid = setFieldState(nom, document.getElementById("nom-error"),
            nom.value.trim().length > 0, "Le nom complet est requis.") && valid;

        valid = setFieldState(email, document.getElementById("email-error"),
            emailRegex.test(email.value.trim()), "Adresse e-mail invalide.") && valid;

        const telDigits = telephone.value.replace(/\D/g, "");
        valid = setFieldState(telephone, document.getElementById("telephone-error"),
            telDigits.length >= 8, "Le téléphone doit contenir au moins 8 chiffres.") && valid;

        valid = setFieldState(participation, document.getElementById("participation-error"),
            participation.value !== "", "Merci de choisir un type de participation.") && valid;

        valid = setFieldState(pays, document.getElementById("pays-error"),
            pays.value !== "", "Merci de choisir un pays.") && valid;

        valid = setFieldState(message, document.getElementById("message-error"),
            message.value.trim().length >= 20, "Le message doit contenir au moins 20 caractères.") && valid;

        const successMsg = document.getElementById("success-msg");

        if (valid) {
            successMsg.classList.add("show");
            inscriptionForm.reset();
            [nom, email, telephone, participation, pays, message].forEach((f) =>
                f.classList.remove("valid", "invalid")
            );
            setTimeout(() => successMsg.classList.remove("show"), 4000);
        } else {
            successMsg.classList.remove("show");
        }
    });
}

// ==========  compteurs animés, animations au scroll (IntersectionObserver), année dynamique du footer ========== //
// --- Année dynamique dans le footer (toutes les pages) ---
document.querySelectorAll(".year").forEach((el) => {
    el.textContent = new Date().getFullYear();
});

// --- Compteurs animés (section chiffres clés) ---
const statNumbers = document.querySelectorAll(".stat-number");
let statsAnimated = false;

function animateStats() {
    statNumbers.forEach((el) => {
        const target = parseInt(el.dataset.target, 10);
        let current = 0;
        const step = Math.max(1, Math.ceil(target / 60));

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            el.textContent = current + (el.dataset.suffix || "");
        }, 25);
    });
}

// --- Animations au scroll (fade / slide / zoom) ---
const revealElements = document.querySelectorAll(".reveal, .reveal-left");

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");

                if (entry.target.id === "stats-section" && !statsAnimated) {
                    statsAnimated = true;
                    animateStats();
                }
            }
        });
    },
    { threshold: 0.25 }
);
revealElements.forEach((el) => observer.observe(el));
 
 

