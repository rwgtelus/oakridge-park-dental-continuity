const phoneDisplay = "604-266-5313";
const phoneLink = "+16042665313";
const email = "smile@oakridgeparkdental.ca";

const navItems = [
  ["home", "Home", "./"],
  ["about", "About", "about/"],
  ["treatments", "Treatments", "treatments/"],
  ["new-patients", "New Patients", "new-patients/"],
  ["contact", "Contact", "contact/"],
];

function navLinks(className = "") {
  const current = document.body.dataset.page;
  return navItems.map(([key, label, href]) =>
    `<a class="${className}" href="${href}"${current === key ? ' aria-current="page"' : ""}>${label}</a>`
  ).join("");
}

function renderHeader() {
  const target = document.querySelector("[data-site-header]");
  if (!target) return;
  target.innerHTML = `
    <a class="skip-link" href="#main-content">Skip to content</a>
    <div class="topbar">
      <div class="container topbar__inner">
        <div><a href="tel:${phoneLink}">${phoneDisplay}</a> &nbsp;|&nbsp; Mon–Thu: 8am–5pm · Fri: 8am–4pm · Sat (2/mo): 9am–2pm</div>
        <a href="mailto:${email}">${email}</a>
      </div>
    </div>
    <header class="site-header" data-header>
      <div class="container site-header__inner">
        <a class="brand" href="./" aria-label="Oakridge Park Dental home">
          <img src="assets/images/opd-horizontal-white_80c4ad53.png" alt="Oakridge Park Dental" width="178" height="60">
        </a>
        <nav class="site-nav" aria-label="Primary navigation">${navLinks()}</nav>
        <div class="header-actions">
          <a class="button button--light header-cta" href="contact/">Request an Appointment</a>
          <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu" aria-label="Open menu"><span></span></button>
        </div>
      </div>
      <nav class="mobile-menu" id="mobile-menu" aria-label="Mobile navigation">${navLinks()}</nav>
    </header>`;

  const header = target.querySelector("[data-header]");
  const toggle = target.querySelector(".menu-toggle");
  const menu = target.querySelector(".mobile-menu");
  const updateHeader = () => header.classList.toggle("is-scrolled", window.scrollY > 18);
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") !== "true";
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menu.classList.toggle("is-open", open);
    document.body.classList.toggle("menu-open", open);
  });

  menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    toggle.setAttribute("aria-expanded", "false");
    menu.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  }));
}

function renderFooter() {
  const target = document.querySelector("[data-site-footer]");
  if (!target) return;
  target.innerHTML = `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div>
            <img class="footer-logo" src="assets/images/opd-horizontal-white_80c4ad53.png" alt="Oakridge Park Dental" width="190" height="64">
            <p class="footer-tagline">Committed To Beautiful Smiles</p>
            <p>Family dental care in Vancouver’s Oakridge community since 1985.</p>
          </div>
          <div>
            <h2>Explore</h2>
            <div class="footer-links">${navLinks()}</div>
          </div>
          <div>
            <h2>Care</h2>
            <div class="footer-links">
              <a href="treatments/">Restorative Dentistry</a>
              <a href="treatments/">Cosmetic Dentistry</a>
              <a href="treatments/">Oral Surgery</a>
              <a href="treatments/">Dentures</a>
              <a href="treatments/">Additional Dental Care</a>
            </div>
          </div>
          <div>
            <h2>Get in Touch</h2>
            <div class="footer-links">
              <a href="tel:${phoneLink}">${phoneDisplay}</a>
              <a href="mailto:${email}">${email}</a>
              <a href="https://www.google.com/maps/search/?api=1&query=Oakridge+Park+Dental+650+West+41st+Avenue+Vancouver+BC" target="_blank" rel="noopener">#305 – 650 West 41st Avenue<br>South Tower, Oakridge Mall<br>Vancouver, BC V5Z 2M9</a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© <span data-year></span> Oakridge Park Dental. All rights reserved.</span>
          <span>Temporary continuity website · Main website restoration in progress</span>
        </div>
      </div>
    </footer>
    <nav class="mobile-contact-bar" aria-label="Quick contact">
      <a href="tel:${phoneLink}">Call Now</a>
      <a href="mailto:${email}?subject=Appointment%20Request">Request by Email</a>
    </nav>`;
  target.querySelector("[data-year]").textContent = new Date().getFullYear();
}

renderHeader();
renderFooter();
