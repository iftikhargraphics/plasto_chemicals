(() => {
  "use strict";

  // Replace with the verified international WhatsApp number, digits only (no +, spaces or dashes).
  // Example format: "923001234567". Keep empty until Plasto confirms its number.
  const WHATSAPP_NUMBER = "";
  const COMPANY_EMAIL = "REPLACE_WITH_COMPANY_EMAIL";

  const body = document.body;
  const menu = document.getElementById("mobile-menu");
  const menuToggle = document.querySelector(".menu-toggle");
  const menuClose = document.querySelector(".menu-close");
  const backdrop = document.querySelector(".menu-backdrop");
  const mobileLinks = [...document.querySelectorAll(".mobile-nav a")];
  let lastFocused = null;
  let closeTimer;

  function openMenu() {
    if (!menu || !menuToggle) return;
    clearTimeout(closeTimer);
    lastFocused = document.activeElement;
    menu.classList.add("is-open");
    backdrop.hidden = false;
    requestAnimationFrame(() => backdrop.classList.add("is-visible"));
    menu.setAttribute("aria-hidden", "false");
    menu.removeAttribute("inert");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close navigation menu");
    body.classList.add("menu-open");
    menuClose?.focus();
  }

  function closeMenu({ restoreFocus = true } = {}) {
    if (!menu || !menuToggle) return;
    menu.classList.remove("is-open");
    backdrop.classList.remove("is-visible");
    menu.setAttribute("aria-hidden", "true");
    menu.setAttribute("inert", "");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    body.classList.remove("menu-open");
    closeTimer = window.setTimeout(() => { backdrop.hidden = true; }, 330);
    if (restoreFocus) (lastFocused || menuToggle).focus();
  }

  menuToggle?.addEventListener("click", () => {
    menuToggle.getAttribute("aria-expanded") === "true" ? closeMenu() : openMenu();
  });
  menuClose?.addEventListener("click", () => closeMenu());
  backdrop?.addEventListener("click", () => closeMenu());
  mobileLinks.forEach(link => link.addEventListener("click", () => closeMenu({ restoreFocus: false })));

  document.addEventListener("keydown", event => {
    if (!menu?.classList.contains("is-open")) return;
    if (event.key === "Escape") {
      event.preventDefault();
      closeMenu();
      return;
    }
    if (event.key === "Tab") {
      const focusable = [...menu.querySelectorAll('a[href], button:not([disabled])')].filter(el => el.offsetParent !== null);
      if (!focusable.length) return;
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault(); last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault(); first.focus();
      }
    }
  });

  // Product details: one accessible dialog, populated independently for each confirmed product.
  const productDialog = document.getElementById("product-dialog");
  const dialogTitle = document.getElementById("dialog-title");
  const dialogInquiry = document.getElementById("dialog-inquiry");
  const dialogClose = document.querySelector(".dialog-close");
  const productButtons = [...document.querySelectorAll(".product-plus")];
  let activeProductButton = null;

  function makeWhatsAppUrl(productName) {
    const message = `Hello Plasto Chemicals, I would like to request product information for ${productName}. Please share the available technical information.`;
    if (!/^\d{8,15}$/.test(WHATSAPP_NUMBER)) return null;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }

  function openProductDetails(button) {
    const productName = button.dataset.product;
    activeProductButton = button;
    dialogTitle.textContent = productName;
    dialogInquiry.href = makeWhatsAppUrl(productName) || "#contact";
    dialogInquiry.textContent = "Request Product Information ↗";
    dialogInquiry.setAttribute("aria-label", `Request product information for ${productName}`);
    if (!makeWhatsAppUrl(productName)) {
      dialogInquiry.href = "#contact";
      dialogInquiry.removeAttribute("target");
      dialogInquiry.title = "Add the verified WhatsApp number in script.js to activate direct WhatsApp enquiries.";
    } else {
      dialogInquiry.target = "_blank";
      dialogInquiry.title = "Open WhatsApp with a prefilled enquiry.";
    }
    productButtons.forEach(item => {
      item.setAttribute("aria-expanded", String(item === button));
      item.querySelector("span").textContent = item === button ? "×" : "+";
    });
    if (typeof productDialog.showModal === "function") productDialog.showModal();
    else productDialog.setAttribute("open", "");
  }

  function closeProductDetails() {
    if (productDialog.open && typeof productDialog.close === "function") productDialog.close();
    else productDialog.removeAttribute("open");
    productButtons.forEach(item => {
      item.setAttribute("aria-expanded", "false");
      item.querySelector("span").textContent = "+";
    });
    activeProductButton?.focus();
  }

  productButtons.forEach(button => button.addEventListener("click", () => openProductDetails(button)));
  dialogClose?.addEventListener("click", closeProductDetails);
  productDialog?.addEventListener("click", event => {
    if (event.target === productDialog) closeProductDetails();
  });
  productDialog?.addEventListener("cancel", event => {
    event.preventDefault();
    closeProductDetails();
  });

  // Live product search. No category filters are shown because verified categories were not supplied.
  const searchInput = document.getElementById("product-search");
  const productCards = [...document.querySelectorAll(".product-card")];
  const productCount = document.getElementById("product-count");
  const noResults = document.getElementById("no-results");
  function filterProducts() {
    const query = (searchInput?.value || "").trim().toLowerCase();
    let visible = 0;
    productCards.forEach(card => {
      const match = card.dataset.name.toLowerCase().includes(query);
      card.hidden = !match;
      if (match) visible++;
    });
    if (productCount) productCount.textContent = `${String(visible).padStart(2, "0")} PRODUCTS`;
    if (noResults) noResults.hidden = visible !== 0;
  }
  searchInput?.addEventListener("input", filterProducts);

  // Accessible client-side validation and email-app handoff (no fake backend success).
  const form = document.getElementById("contact-form");
  const feedback = document.getElementById("form-feedback");
  form?.addEventListener("submit", event => {
    event.preventDefault();
    const fields = [...form.querySelectorAll("input[required], textarea[required]")];
    let firstInvalid = null;
    fields.forEach(field => {
      const valid = field.checkValidity();
      field.setAttribute("aria-invalid", String(!valid));
      if (!valid && !firstInvalid) firstInvalid = field;
    });
    if (firstInvalid) {
      feedback.textContent = "Please check the highlighted fields and enter valid information.";
      feedback.classList.add("error");
      firstInvalid.focus();
      firstInvalid.reportValidity();
      return;
    }
    feedback.classList.remove("error");
    if (!COMPANY_EMAIL || COMPANY_EMAIL.includes("REPLACE_WITH")) {
      feedback.textContent = "The form is valid. Add Plasto's verified company email in script.js to enable sending enquiries.";
      return;
    }
    const data = new FormData(form);
    const subject = encodeURIComponent(`Website enquiry: ${data.get("product") || "General enquiry"}`);
    const message = encodeURIComponent(
      `Name: ${data.get("name")}\nEmail: ${data.get("email")}\nCompany: ${data.get("company") || "Not provided"}\nProduct / subject: ${data.get("product") || "Not specified"}\n\nMessage:\n${data.get("message")}`
    );
    feedback.textContent = "Opening your email app with the enquiry details.";
    window.location.href = `mailto:${COMPANY_EMAIL}?subject=${subject}&body=${message}`;
  });
  form?.querySelectorAll("input, textarea").forEach(field => {
    field.addEventListener("input", () => {
      if (field.checkValidity()) field.setAttribute("aria-invalid", "false");
    });
  });

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Smooth in-page navigation, respecting reduced-motion preferences.
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", event => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (!target) return;
      if (anchor.closest(".mobile-nav")) closeMenu({ restoreFocus: false });
      if (!reduceMotion) {
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", anchor.getAttribute("href"));
      }
    });
  });
})();