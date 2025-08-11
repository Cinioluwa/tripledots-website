/*
 * ===================================================================
 * TRIPLE DOTS MAIN JAVASCRIPT
 *
 * ASSEMBLY INSTRUCTIONS:
 * This file is built by combining the JS from the `src` folder.
 * Each section's code is wrapped in an `init...()` function
 * to prevent variable conflicts.
 * ===================================================================
*/


// --- SECTION INITIALIZERS ---

// From: src/hero/hero.js
function initHero() {
  // Paste content of hero.js here
  console.log("Hero section initialized.");
}

// From: src/about/about.js
function initAbout() {
  // Paste content of about.js here
  console.log("About section initialized.");
}

// From: src/services/services.js
function initServices() {
    // Paste content of services.js here
    console.log("Services section initialized.");
}

// From: src/careers/careers.js
function initCareers() {
    // Paste content of careers.js here
    console.log("Careers section initialized.");
}

// From: src/contact/contact.js
function initContact() {
    // Paste content of contact.js here
    console.log("Contact section initialized.");
}

// From: src/footer/footer.js
function initFooter() {
    // Paste content of footer.js here
    console.log("Footer section initialized.");
}


/**
 * Main application entry point.
 * This function runs once the entire HTML document has been loaded.
 * It calls the initializer for each section.
 */
function main() {
  console.log("Welcome to Tripledots!");
  initHero();
  initAbout();
  initServices();
  initCareers();
  initContact();
  initFooter();
}

// --- APP LAUNCH ---
// We wait for the DOM to be fully loaded before running our main function.
document.addEventListener('DOMContentLoaded', main);
