(() => {
  'use strict';
  const config = window.PLASTO_CONFIG || {};
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const safeUrl = value => {
    try { const url = new URL(value); return ['https:', 'http:'].includes(url.protocol) ? url.href : ''; }
    catch { return ''; }
  };
  const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));

  // ============ MOBILE NAVIGATION (right drawer) ============
  const menuToggle = $('#menuToggle');
  const mainNav = $('#mainNav');

  const positionMenu = () => {
    if (!mainNav) return;
    const headerEl = $('.site-header');
    const bottom = headerEl ? headerEl.getBoundingClientRect().bottom : 74;
    mainNav.style.top = `${Math.max(0, Math.round(bottom))}px`;
  };

  const closeMenu = () => {
    if (!mainNav) return;
    mainNav.classList.remove('open');
    mainNav.style.top = '';
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.setAttribute('aria-label', 'Open navigation');
    document.body.classList.remove('menu-open');
    if (menuToggle) menuToggle.innerHTML = '<i data-lucide="menu"></i>';
    refreshIcons();
  };

  const openMenu = () => {
    if (!mainNav) return;
    mainNav.classList.add('open');
    document.body.classList.add('menu-open');
    positionMenu();
    requestAnimationFrame(positionMenu);
    menuToggle?.setAttribute('aria-expanded', 'true');
    menuToggle?.setAttribute('aria-label', 'Close navigation');
    if (menuToggle) menuToggle.innerHTML = '<i data-lucide="x"></i>';
    refreshIcons();
  };

  menuToggle?.addEventListener('click', event => {
    event.stopPropagation();
    if (mainNav?.classList.contains('open')) closeMenu();
    else openMenu();
  });

  document.addEventListener('click', event => {
    if (!mainNav?.classList.contains('open')) return;
    if (mainNav.contains(event.target)) return;
    if (menuToggle?.contains(event.target)) return;
    closeMenu();
  });

  $$('.main-nav a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
  window.addEventListener('resize', () => {
    if (mainNav?.classList.contains('open')) positionMenu();
  });

  // ============ HEADER / BACK-TO-TOP / ACTIVE NAV ============
  const header = $('.site-header');
  const backToTop = $('#backToTop');
  const navLinks = $$('.nav-link');
  const sections = navLinks.map(link => $(link.getAttribute('href'))).filter(Boolean);
  const updateScrollUI = () => {
    const y = window.scrollY;
    header?.classList.toggle('scrolled', y > 20);
    backToTop?.classList.toggle('visible', y > 650);
    let active = sections[0];
    sections.forEach(section => { if (section.getBoundingClientRect().top <= 150) active = section; });
    navLinks.forEach(link => link.classList.toggle('active', active && link.getAttribute('href') === `#${active.id}`));
  };
  window.addEventListener('scroll', updateScrollUI, { passive: true });
  updateScrollUI();
  backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // ============ REVEAL ON SCROLL ============
  const revealTargets = $$('.section-pad .container, .capability, .service-row, .industry-card, .leader-card, .product-item');
  revealTargets.forEach((element, index) => {
    element.classList.add('reveal');
    if (index % 4 === 1) element.classList.add('reveal-delay-1');
    if (index % 4 === 2) element.classList.add('reveal-delay-2');
    if (index % 4 === 3) element.classList.add('reveal-delay-3');
  });
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target); }
    }), { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
    revealTargets.forEach(element => revealObserver.observe(element));
  } else revealTargets.forEach(element => element.classList.add('is-visible'));

  // ============ PRODUCT ACCORDION (with images) ============
  const productList = $('#productList');
  const products = Array.isArray(config.products) ? config.products : [];
  const whatsappNumber = String(config.whatsapp || '923459075244').replace(/\D/g, '');
  const makeWhatsAppUrl = message => `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  const renderProducts = () => {
    if (!productList) return;
    productList.innerHTML = products.map((product, index) => {
      const name = escapeHTML(product.name || `Product ${index + 1}`);
      const description = escapeHTML(product.description || 'Contact our team for verified product information.');
      const applications = escapeHTML(product.applications || 'Applications to be confirmed with the client.');
      const imagePath = product.image ? escapeHTML(product.image) : '';
      const initials = String(product.name || 'PC').split(/\s+/).slice(0, 2).map(part => part[0] || '').join('').toUpperCase();
      const panelId = `product-panel-${index}`;

      const thumbMarkup = imagePath
        ? `<span class="product-thumb"><img src="${imagePath}" alt="" loading="lazy" onerror="this.remove();this.nextElementSibling.hidden=false;"><span class="product-thumb-fallback" hidden aria-hidden="true">${escapeHTML(initials)}</span></span>`
        : `<span class="product-thumb"><span class="product-thumb-fallback" aria-hidden="true">${escapeHTML(initials)}</span></span>`;

      const mediaMarkup = imagePath
        ? `<div class="product-media"><img src="${imagePath}" alt="${name}" loading="lazy" onerror="this.remove();this.nextElementSibling.hidden=false;"><div class="product-media-fallback" hidden aria-hidden="true"><span>${escapeHTML(initials)}</span></div></div>`
        : `<div class="product-media"><div class="product-media-fallback" aria-hidden="true"><span>${escapeHTML(initials)}</span></div></div>`;

      return `<article class="product-item" data-product-index="${index}">
        <button class="product-trigger" type="button" aria-expanded="false" aria-controls="${panelId}">
          ${thumbMarkup}
          <span class="product-name">${name}</span>
          <span class="product-plus" aria-hidden="true">+</span>
        </button>
        <div class="product-panel" id="${panelId}" aria-hidden="true"><div class="product-panel-inner"><div class="product-panel-content">
          ${mediaMarkup}
          <p>${description}</p>
          <p class="product-applications">Applications: ${applications}</p>
          <a class="product-inquiry" href="${makeWhatsAppUrl(`Hello Plasto Chemicals, I would like to request information about ${product.name || 'your product range'}.`)}" target="_blank" rel="noopener noreferrer">Request information ↗</a>
        </div></div></div>
      </article>`;
    }).join('');

    $$('.product-item', productList).forEach(item => {
      const trigger = $('.product-trigger', item);
      const panel = $('.product-panel', item);
      trigger.addEventListener('click', () => {
        const willOpen = !item.classList.contains('open');
        $$('.product-item', productList).forEach(other => {
          other.classList.remove('open');
          $('.product-trigger', other)?.setAttribute('aria-expanded', 'false');
          $('.product-panel', other)?.setAttribute('aria-hidden', 'true');
        });
        if (willOpen) {
          item.classList.add('open');
          trigger.setAttribute('aria-expanded', 'true');
          panel.setAttribute('aria-hidden', 'false');
        }
      });
    });
  };
  renderProducts();

  // ============ LEADERSHIP ============
  const leadershipGrid = $('#leadershipGrid');
  const leadership = (config.leadership || []).filter(person => person.visible);
  if (leadershipGrid) {
    leadershipGrid.innerHTML = leadership.map(person => {
      const name = escapeHTML(person.name);
      const role = escapeHTML(person.role);
      const imagePath = person.image ? escapeHTML(person.image) : '';
      const initials = String(person.name || 'PC').split(/\s+/).slice(0, 2).map(part => part[0] || '').join('').toUpperCase();
      return `<article class="leader-card"><div class="leader-photo">${imagePath ? `<img src="${imagePath}" alt="${name}" loading="lazy" onerror="this.remove();this.nextElementSibling.hidden=false">` : ''}<div class="leader-placeholder" ${imagePath ? 'hidden' : ''}>${escapeHTML(initials)}</div></div><div class="leader-info"><h3>${name}</h3><p>${role}</p>${!person.image ? '<small class="leader-pending">Portrait to be supplied</small>' : ''}</div></article>`;
    }).join('');
  }

  // ============ CONTACT ============
  const phoneLinks = $('#phoneLinks');
  if (phoneLinks) {
    phoneLinks.innerHTML = (config.phones || []).map(phone => `<a href="tel:${escapeHTML(phone.href)}">${escapeHTML(phone.display)}</a>`).join('');
  }
  const emailLink = $('a[href^="mailto:"]');
  if (emailLink && config.email) { emailLink.href = `mailto:${config.email}`; emailLink.textContent = config.email; }
  const addressText = $('#addressText');
  if (addressText && config.location?.address) addressText.textContent = config.location.address;

  // ============ SOCIAL LINKS ============
  const socialNote = $('#socialNote');
  const iconMap = { Facebook: 'facebook', Instagram: 'instagram', LinkedIn: 'linkedin', YouTube: 'youtube', TikTok: 'music-2', X: 'twitter', WhatsApp: 'message-circle' };
  const configuredSocials = (config.socialLinks || []).filter(item => item.enabled !== false && safeUrl(item.url));
  const socials = [...configuredSocials];
  if (whatsappNumber && !socials.some(item => String(item.platform).toLowerCase() === 'whatsapp')) {
    socials.push({ platform: 'WhatsApp', url: `https://wa.me/${whatsappNumber}` });
  }
  const socialMarkup = socials.map(item => {
    const platform = escapeHTML(item.platform);
    const url = safeUrl(item.url);
    return `<a class="social-link" href="${url}" target="_blank" rel="noopener noreferrer" aria-label="Visit Plasto Chemicals on ${platform}" title="${platform}"><i data-lucide="${iconMap[item.platform] || 'external-link'}"></i></a>`;
  }).join('');
  ['#socialLinks', '#homepageSocialLinks', '#footerSocialLinks'].forEach(selector => {
    const container = $(selector);
    if (container) container.innerHTML = socialMarkup;
  });
  if (socialNote) socialNote.hidden = socials.length > 1;

  // ============ MAP ============
  const mapFrame = $('#mapFrame');
  const directionsLink = $('#directionsLink');
  const location = config.location || {};
  const embedUrl = safeUrl(location.mapsEmbedUrl || '');
  const directionsUrl = safeUrl(location.directionsUrl || (location.address ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(location.address)}` : ''));
  if (embedUrl && mapFrame) {
    const iframe = document.createElement('iframe');
    iframe.src = embedUrl;
    iframe.title = 'Map showing Plasto Chemicals business location';
    iframe.loading = 'lazy';
    iframe.referrerPolicy = 'no-referrer-when-downgrade';
    iframe.allowFullscreen = true;
    mapFrame.replaceChildren(iframe);
  }
  if (directionsUrl && directionsLink) {
    directionsLink.href = directionsUrl;
    directionsLink.target = '_blank';
    directionsLink.rel = 'noopener noreferrer';
    directionsLink.classList.remove('disabled');
    directionsLink.removeAttribute('aria-disabled');
  }

  // ============ WHATSAPP FLOAT & INQUIRY FORM ============
  const whatsappFloat = $('#whatsappFloat');
  if (whatsappFloat) whatsappFloat.href = makeWhatsAppUrl('Hello Plasto Chemicals, I would like to know more about your products and services.');
  const interestSelect = $('#interestSelect');
  if (interestSelect) {
    products.forEach(product => {
      const productName = String(product.name || '').trim();
      if (productName && ![...interestSelect.options].some(option => option.textContent.trim() === productName)) {
        const option = document.createElement('option'); option.value = productName; option.textContent = productName; interestSelect.append(option);
      }
    });
  }
  const inquiryForm = $('#inquiryForm');
  const formStatus = $('#formStatus');
  inquiryForm?.addEventListener('submit', event => {
    event.preventDefault();
    if (!inquiryForm.reportValidity()) return;
    const formData = new FormData(inquiryForm);
    const values = Object.fromEntries(formData.entries());
    const subject = values.subject || `Website inquiry — ${values.interest || 'General inquiry'}`;
    const body = [
      'PLASTO CHEMICALS — WEBSITE INQUIRY', '',
      `Name: ${values.name || ''}`,
      `Company: ${values.company || 'Not provided'}`,
      `Email: ${values.email || ''}`,
      `Phone: ${values.phone || 'Not provided'}`,
      `Product / Service: ${values.interest || 'General inquiry'}`,
      `Subject: ${values.subject || ''}`,
      '', 'Message:', values.message || ''
    ].join('\n');
    const mailto = `mailto:${config.email || 'anwarchemist@gmail.com'}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    if (formStatus) formStatus.textContent = 'Your email application should open with the inquiry prepared. Please review and send it to complete your inquiry.';
    window.location.href = mailto;
  });

  $$('.product-inquiry').forEach(link => link.addEventListener('click', () => {
    const label = link.closest('.product-item')?.querySelector('.product-trigger .product-name')?.textContent?.trim();
    if (interestSelect && label) {
      const option = [...interestSelect.options].find(item => item.textContent.trim() === label);
      if (option) interestSelect.value = option.value;
    }
  }));

  // ============ FOOTER YEAR & ICONS ============
  const year = $('#year');
  if (year) year.textContent = new Date().getFullYear();
  function refreshIcons() { if (window.lucide?.createIcons) window.lucide.createIcons(); }
  refreshIcons();
})();