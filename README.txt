PLASTO CHEMICALS WEBSITE
========================

This is a static website built with plain HTML, CSS and JavaScript.
No React, build step, database or framework is required.

FILES
-----
index.html   Main responsive website and page sections
styles.css   Design system, responsive layouts and animations
app.js       Navigation, product accordion, social links, map, inquiry form
config.js    Client-editable contact, map, social, leadership and product data
assets/      Original image assets extracted from the supplied PCL.zip

RUN LOCALLY
-----------
1. Keep the folder structure intact.
2. Open index.html in a browser.
   Recommended: use VS Code Live Server for local development.

CLIENT CONFIGURATION
--------------------
Edit config.js:

1. location.address
   Enter the verified business address.

2. location.mapsEmbedUrl
   Paste a Google Maps embed URL (Google Maps > Share > Embed a map).

3. location.directionsUrl
   Optional. Paste the exact Google Maps directions URL.
   If omitted and an address is present, a directions URL is generated.

4. socialLinks
   Add the official profile URLs for Facebook, Instagram, LinkedIn,
   YouTube, TikTok and X. Empty URLs are intentionally hidden.
   WhatsApp is generated from the configured WhatsApp phone number.

5. leadership
   Replace the Director and Manager placeholder names.
   Add the real portrait file path to each person's image property.
   Place portrait files in assets/images/leadership/.
   Suggested files: ceo.jpg, director.jpg, manager.jpg.
   The website currently uses initials instead of fabricated portraits.

6. products
   The source website confirms six Alton product names. Product descriptions
   and applications were not supplied, so the current text is an explicit
   request-for-information placeholder. Replace it only with client-approved
   manufacturer information. Replace Product 07 with its verified name.

CONTACT FORM
------------
The inquiry form validates its fields and opens the visitor's default email
application with a prepared email (mailto). It does not submit to a server.
For direct website submissions, connect a backend or a form service and update
its endpoint in app.js. Do not advertise server submission until configured.

MAP
---
The map remains a clear placeholder until a verified Google Maps embed URL
or business address is added to config.js.

SOCIAL LINKS
------------
Only links with valid http/https URLs are displayed. Do not add guessed URLs.

NOTES
-----
The website uses the original PCL logo and selected industrial images from
PCL.zip. Additional hero and editorial photography uses remote Unsplash image
URLs, so an internet connection is required for those remote images and fonts.
