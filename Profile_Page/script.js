/* =====================================================
   PROFILE WEBSITE - JAVASCRIPT
===================================================== */


/* =====================================================
   1. TYPING EFFECT
===================================================== */

const profession = document.querySelector(".hero h3");

const text = [
    "AI & Data Science Student",
    "Python Programmer",
    "Web Developer",
    "Problem Solver"
];

let textIndex = 0;
let characterIndex = 0;
let deleting = false;


function typingEffect() {

    if (!profession) {
        return;
    }

    const currentText = text[textIndex];

    if (!deleting) {

        profession.textContent =
            currentText.substring(0, characterIndex + 1);

        characterIndex++;

        if (characterIndex === currentText.length) {

            deleting = true;

            setTimeout(typingEffect, 1500);

            return;
        }

    } else {

        profession.textContent =
            currentText.substring(0, characterIndex - 1);

        characterIndex--;

        if (characterIndex === 0) {

            deleting = false;

            textIndex++;

            if (textIndex === text.length) {
                textIndex = 0;
            }

        }

    }

    const speed = deleting ? 60 : 100;

    setTimeout(typingEffect, speed);
}

typingEffect();


/* =====================================================
   2. SCROLL REVEAL EFFECT
===================================================== */

const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver(
    function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }

        });

    },
    {
        threshold: 0.15
    }
);

sections.forEach(function (section) {

    section.classList.add("hidden");

    observer.observe(section);

});


/* =====================================================
   3. ACTIVE NAVIGATION LINK
===================================================== */

const navigationLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", function () {

    let currentSection = "";

    sections.forEach(function (section) {

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            currentSection = section.getAttribute("id");
        }

    });

    navigationLinks.forEach(function (link) {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + currentSection) {
            link.classList.add("active");
        }

    });

});


/* =====================================================
   4. CONTACT FORM VALIDATION
===================================================== */

const contactForm = document.querySelector("#contact form");

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.querySelector("#name").value.trim();
        const email = document.querySelector("#email").value.trim();
        const message = document.querySelector("#message").value.trim();

        /* Check empty fields */

        if (name === "" || email === "" || message === "") {
            alert("Please fill in all the fields.");
            return;
        }

        /* Check email */

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        /* Success */

        alert(
            "Thank you, " +
            name +
            "! Your message has been submitted successfully."
        );

        contactForm.reset();

    });

}


/* =====================================================
   5. BACK TO TOP BUTTON
===================================================== */

const backToTop = document.createElement("button");

backToTop.innerHTML = "↑";
backToTop.classList.add("back-to-top");
backToTop.setAttribute("aria-label", "Back to top");

document.body.appendChild(backToTop);

window.addEventListener("scroll", function () {

    if (window.scrollY > 500) {
        backToTop.classList.add("visible");
    } else {
        backToTop.classList.remove("visible");
    }

});

backToTop.addEventListener("click", function () {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* =====================================================
   6. PROJECT CARD EFFECT
===================================================== */

const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach(function (card) {

    card.addEventListener("mouseenter", function () {
        card.style.transform = "translateY(-12px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
        card.style.transform = "translateY(0) scale(1)";
    });

});


/* =====================================================
   7. AUTOMATIC FOOTER YEAR
===================================================== */

const footer = document.querySelector("footer");

if (footer) {

    const footerText = footer.querySelector("p");

    if (footerText) {
        footerText.innerHTML =
            "© " +
            new Date().getFullYear() +
            " Ankit. All Rights Reserved.";
    }

}


/* =====================================================
   8. WELCOME MESSAGE
===================================================== */

console.log("Welcome to Ankit's Profile Website!");
/* =====================================================
   9. PROFILE PICTURE MENU (OPEN / CHANGE)
===================================================== */

const profileImage = document.querySelector(".profile-image img");
const photoInput = document.querySelector("#photoInput");

if (profileImage && photoInput) {

    profileImage.style.cursor = "pointer";

    /* Load the saved picture, if there is one */
    try {
        const savedPhoto = localStorage.getItem("profilePhoto");
        if (savedPhoto) {
            profileImage.src = savedPhoto;
        }
    } catch (error) {
        console.log("Could not load saved photo.");
    }

    let menu = null;

    function closeMenu() {
        if (menu) {
            menu.remove();
            menu = null;
        }
    }

    /* Show the picture large on a dark background */
    function openPicture() {

        const overlay = document.createElement("div");
        overlay.classList.add("image-overlay");

        const bigImage = document.createElement("img");
        bigImage.src = profileImage.src;
        bigImage.alt = profileImage.alt;

        overlay.appendChild(bigImage);
        document.body.appendChild(overlay);

        overlay.addEventListener("click", function () {
            overlay.remove();
        });
    }

    /* Click on the profile picture: show the 2 options */
    profileImage.addEventListener("click", function (event) {

        event.stopPropagation();

        if (menu) {
            closeMenu();
            return;
        }

        menu = document.createElement("div");
        menu.classList.add("photo-menu");

        const openButton = document.createElement("button");
        openButton.textContent = "Open Picture";

        const changeButton = document.createElement("button");
        changeButton.textContent = "Change Picture";

        openButton.addEventListener("click", function () {
            closeMenu();
            openPicture();
        });

        changeButton.addEventListener("click", function () {
            closeMenu();
            photoInput.click();   /* opens your folders */
        });

        menu.appendChild(openButton);
        menu.appendChild(changeButton);

        const rect = profileImage.getBoundingClientRect();
        menu.style.top = (rect.bottom + 10) + "px";
        menu.style.left = (rect.left + rect.width / 2) + "px";

        document.body.appendChild(menu);
    });

    /* Close the menu when clicking elsewhere or scrolling */
    document.addEventListener("click", closeMenu);
    window.addEventListener("scroll", closeMenu);

    /* After choosing a file from the folder */
    photoInput.addEventListener("change", function () {

        const file = photoInput.files[0];

        if (!file) {
            return;
        }

        const reader = new FileReader();

        reader.onload = function () {

            profileImage.src = reader.result;

            try {
                localStorage.setItem("profilePhoto", reader.result);
            } catch (error) {
                alert("Picture changed, but it is too large to be saved after refresh.");
            }
        };

        reader.readAsDataURL(file);
    });

}