# Plasto Chemicals website

A responsive, single-page company website built with HTML5, CSS3 and vanilla JavaScript.

## Files
- `index.html` – semantic page structure, SEO metadata and sections.
- `styles.css` – responsive visual system and reduced-motion support.
- `script.js` – mobile navigation, product dialog/search and validated contact form.

## Before publishing
1. Replace the company email placeholder in `script.js` (`COMPANY_EMAIL`) and `index.html`.
2. Add the verified WhatsApp phone number to `WHATSAPP_NUMBER` in `script.js`. Use international digits only, without `+`, spaces or punctuation.
3. Replace `https://www.example.com` in the JSON-LD structured data with the official domain.
4. Replace the six labelled product-image placeholders with approved product photographs. Keep the same `.product-visual` aspect ratio and use optimized WebP/AVIF assets with descriptive alt text.
5. Add approved company history, verified service capabilities, industries, R&D information, leadership profiles, certifications and technical product documents only after the company confirms them.
6. The contact form currently validates in the browser and prepares a `mailto:` enquiry once a verified email is configured. It does not submit to a server or store data. For production lead capture, connect a secure backend or approved form provider and add spam protection and a privacy notice.

## Product details and WhatsApp
Each product plus button opens the shared accessible product dialog. Product names are populated per card. Until verified product information is supplied, the panel displays: “Contact our team for technical information.” The WhatsApp inquiry URL is enabled automatically after a valid `WHATSAPP_NUMBER` is configured. Until then, the inquiry action takes the visitor to Contact.

## Responsive navigation
The mobile menu contains all nine requested navigation destinations, scrolls independently, locks background scrolling, traps keyboard focus, closes by close button, outside click, Escape and navigation selection.

## Local preview
Open `index.html` directly in a modern browser, or run a local static server from this directory:
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000`.

## Validation performed
- Source structure checked for all nine mobile navigation anchors and six product cards.
- Product detail dialog, product search, contact form and menu event handlers are present.
- Responsive CSS includes breakpoints at 980px, 700px and 360px, covering requested 320, 375, 390 and 430px viewports.
- Reduced-motion media query is included.
- JavaScript syntax should be checked with `node --check script.js` where Node.js is available.

This is a polished front-end deliverable, not a fully deployed production service. Company contact details, product photography, verified content, domain, and server-side form handling remain company-supplied launch requirements.
