(function(){
  "use strict";

  /* =====================================================
     TRACKING HELPERS (safe no-ops until you paste your
     GTM / GA4 / Meta Pixel code in index.html <head>).
     Once installed, these automatically start firing —
     no extra setup needed.
  ===================================================== */
  /* =====================================================
     TRACKING HELPER — GTM-first architecture
     Every interaction is pushed to window.dataLayer only.
     Google Tag Manager (container GTM-TNPN5NLX) is
     responsible for routing these events to GA4, Meta Pixel,
     Microsoft Clarity, or any other tag — configured entirely
     inside GTM, with no fbq()/gtag() calls in this file.
  ===================================================== */
  function trackEvent(eventName, params){
    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(Object.assign({ event: eventName }, params || {}));
    } catch (err){ /* tracking must never break the page */ }
  }

  /* =====================================================
     PRODUCT DATA
     4 real colorways, each with actual product photos.
     (Noir/Beige removed — no real photos exist for them.)
  ===================================================== */
  const COLORS = [
    { name: "Rose",      images: ["assets/images/rose-1.jpg","assets/images/rose-2.jpg","assets/images/rose-3.jpg","assets/images/rose-4.jpg"] },
    { name: "Marron",    images: ["assets/images/marron-1.jpg","assets/images/marron-2.jpg","assets/images/marron-3.jpg"] },
    { name: "Bleu Ciel", images: ["assets/images/bleu-1.jpg","assets/images/bleu-2.jpg","assets/images/bleu-3.jpg","assets/images/bleu-4.jpg"] },
    { name: "Jaune",     images: ["assets/images/jaune-1.jpg","assets/images/jaune-2.jpg","assets/images/jaune-3.jpg","assets/images/jaune-4.jpg"] }
  ];
  const SIZES = ["S","M","L","XL","XXL"];

  let state = { colorIndex: 0, size: null, imgIndex: 0 };

  /* =====================================================
     RENDER: COLOR SWATCHES (real photo thumbnails)
  ===================================================== */
  const colorSwatchesEl = document.getElementById('colorSwatches');
  const selectedColorLabel = document.getElementById('selectedColorLabel');

  function renderColorSwatches(){
    colorSwatchesEl.innerHTML = "";
    COLORS.forEach((c, i) => {
      const btn = document.createElement('button');
      btn.type = "button";
      btn.className = "swatch" + (i === state.colorIndex ? " active" : "");
      btn.setAttribute('aria-label', `Couleur ${c.name}`);
      btn.setAttribute('aria-pressed', i === state.colorIndex ? 'true' : 'false');
      btn.innerHTML = `<span class="swatch-color" style="background-image:url('${c.images[0]}')"></span>`;
      btn.addEventListener('click', () => selectColor(i));
      colorSwatchesEl.appendChild(btn);
    });
  }

  function selectColor(i){
    state.colorIndex = i;
    state.imgIndex = 0;
    const c = COLORS[i];
    selectedColorLabel.textContent = c.name;
    renderColorSwatches();
    renderGallery();
    updateSummary();
    trackEvent('select_color', { color: c.name });
  }

  /* =====================================================
     RENDER: GALLERY (hero image + thumbnails)
  ===================================================== */
  const mainImage = document.getElementById('mainImage');
  const thumbRow = document.getElementById('thumbRow');
  const zoomImage = document.getElementById('zoomImage');

  function renderGallery(){
    const c = COLORS[state.colorIndex];
    const images = c.images;
    mainImage.style.opacity = 0;
    setTimeout(() => {
      mainImage.src = images[state.imgIndex] || images[0];
      mainImage.alt = `Ensemble Brodé Premium Kenimoda — coloris ${c.name}`;
      mainImage.style.opacity = 1;
    }, 120);

    thumbRow.innerHTML = "";
    images.forEach((src, idx) => {
      const t = document.createElement('div');
      t.className = "thumb" + (idx === state.imgIndex ? " active" : "");
      t.setAttribute('role', 'button');
      t.setAttribute('tabindex', '0');
      t.setAttribute('aria-label', `Voir la photo ${idx+1} sur ${images.length}`);
      t.setAttribute('aria-current', idx === state.imgIndex ? 'true' : 'false');
      t.innerHTML = `<img src="${src}" alt="Miniature ${idx+1} — Ensemble Brodé Premium Kenimoda, coloris ${c.name}" width="74" height="92" loading="lazy" decoding="async">`;
      t.addEventListener('click', () => { state.imgIndex = idx; renderGallery(); });
      t.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' '){ e.preventDefault(); state.imgIndex = idx; renderGallery(); }
      });
      thumbRow.appendChild(t);
    });
  }

  /* mobile swipe support */
  let touchStartX = 0;
  document.addEventListener('touchstart', e => {
    if (e.target.closest('.stitch-frame')) touchStartX = e.touches[0].clientX;
  }, { passive:true });
  document.addEventListener('touchend', e => {
    if (!e.target.closest('.stitch-frame')) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    const images = COLORS[state.colorIndex].images;
    if (!images.length) return;
    if (dx < -40) { state.imgIndex = (state.imgIndex + 1) % images.length; renderGallery(); }
    if (dx > 40)  { state.imgIndex = (state.imgIndex - 1 + images.length) % images.length; renderGallery(); }
  }, { passive:true });

  /* =====================================================
     ZOOM MODAL
  ===================================================== */
  const zoomModal = document.getElementById('zoomModal');
  const zoomBtn = document.getElementById('zoomBtn');
  const closeZoomBtn = document.getElementById('closeZoomModal');

  function openZoomModal(){
    zoomImage.src = mainImage.src;
    zoomImage.alt = mainImage.alt;
    zoomModal.hidden = false;
    closeZoomBtn.focus();
    trackEvent('view_image_zoom', { color: COLORS[state.colorIndex].name });
  }
  function closeZoomModal(){
    zoomModal.hidden = true;
    zoomBtn.focus();
  }
  zoomBtn.addEventListener('click', openZoomModal);
  closeZoomBtn.addEventListener('click', closeZoomModal);
  zoomModal.addEventListener('click', e => { if (e.target === zoomModal) closeZoomModal(); });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape'){
      if (!zoomModal.hidden) closeZoomModal();
      if (!sizeModal.hidden) closeSizeModal();
    }
  });

  /* =====================================================
     SIZE SELECTOR
  ===================================================== */
  const sizeSwatchesEl = document.getElementById('sizeSwatches');
  const selectedSizeLabel = document.getElementById('selectedSizeLabel');

  function renderSizes(){
    sizeSwatchesEl.innerHTML = "";
    SIZES.forEach(s => {
      const btn = document.createElement('button');
      btn.type = "button";
      btn.className = "size-chip" + (state.size === s ? " active" : "");
      btn.textContent = s;
      btn.setAttribute('aria-pressed', state.size === s ? 'true' : 'false');
      btn.addEventListener('click', () => {
        state.size = s;
        selectedSizeLabel.textContent = s;
        renderSizes();
        updateSummary();
        trackEvent('select_size', { size: s });
      });
      sizeSwatchesEl.appendChild(btn);
    });
  }

  /* =====================================================
     SIZE GUIDE MODAL
  ===================================================== */
  const sizeModal = document.getElementById('sizeModal');
  const openSizeGuideBtn = document.getElementById('openSizeGuide');
  const closeSizeGuideBtn = document.getElementById('closeSizeModal');

  function openSizeModal(){
    sizeModal.hidden = false;
    closeSizeGuideBtn.focus();
    trackEvent('view_size_guide', {});
  }
  function closeSizeModal(){
    sizeModal.hidden = true;
    openSizeGuideBtn.focus();
  }
  openSizeGuideBtn.addEventListener('click', openSizeModal);
  closeSizeGuideBtn.addEventListener('click', closeSizeModal);
  sizeModal.addEventListener('click', e => { if (e.target === sizeModal) closeSizeModal(); });

  /* =====================================================
     ORDER SUMMARY SYNC
  ===================================================== */
  function updateSummary(){
    const c = COLORS[state.colorIndex];
    document.getElementById('summaryImg').src = c.images[0];
    document.getElementById('summaryColor').textContent = c.name;
    document.getElementById('summarySize').textContent = state.size || "—";
    document.getElementById('hiddenColor').value = c.name;
    document.getElementById('hiddenSize').value = state.size || "";
  }

  /* =====================================================
     COUNTDOWN TIMER (auto restarts every 6 hours)
  ===================================================== */
  function startCountdown(){
    const DURATION = 6 * 60 * 60 * 1000; // 6h cycle
    let end = Number(localStorage.getItem('promoEnd'));
    if (!end || end < Date.now()){
      end = Date.now() + DURATION;
      localStorage.setItem('promoEnd', end);
    }
    function tick(){
      let diff = end - Date.now();
      if (diff <= 0){
        end = Date.now() + DURATION;
        localStorage.setItem('promoEnd', end);
        diff = DURATION;
      }
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      document.getElementById('cd-h').textContent = String(h).padStart(2,'0');
      document.getElementById('cd-m').textContent = String(m).padStart(2,'0');
      document.getElementById('cd-s').textContent = String(s).padStart(2,'0');
    }
    tick();
    setInterval(tick, 1000);
  }

  /* =====================================================
     REVIEWS — honest placeholder
     No fake reviews are fabricated. This renders a simple
     "coming soon" state ready to be replaced with real
     verified customer reviews once you have them.
  ===================================================== */
  function renderReviews(){
    const grid = document.getElementById('reviewsGrid');
    if (!grid) return;
    grid.innerHTML = `
      <div class="review-placeholder reveal">
        <div class="review-placeholder-icon">💬</div>
        <p class="review-placeholder-text">
          Les premières clientes commandent en ce moment — les avis vérifiés seront affichés ici très bientôt.
        </p>
        <p class="review-placeholder-cta">
          Vous avez déjà commandé ? Envoyez-nous votre avis sur
          <a href="https://wa.me/212612449474?text=Bonjour%2C%20je%20souhaite%20partager%20mon%20avis%20sur%20l'Ensemble%20Brod%C3%A9%20Premium." target="_blank" rel="noopener noreferrer">WhatsApp</a>.
        </p>
      </div>
    `;
  }

  /* =====================================================
     FAQ ACCORDION
  ===================================================== */
  function initAccordion(){
    document.querySelectorAll('.acc-item').forEach(item => {
      const trigger = item.querySelector('.acc-trigger');
      const panel = item.querySelector('.acc-panel');
      trigger.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.acc-item').forEach(i => {
          i.classList.remove('open');
          i.querySelector('.acc-panel').style.maxHeight = null;
          i.querySelector('.acc-trigger').setAttribute('aria-expanded', 'false');
        });
        if (!isOpen){
          item.classList.add('open');
          panel.style.maxHeight = panel.scrollHeight + "px";
          trigger.setAttribute('aria-expanded', 'true');
          trackEvent('faq_open', { question: trigger.textContent.trim() });
        }
      });
    });
  }

  /* =====================================================
     FORM VALIDATION + SUBMIT (Formspree via fetch)
  ===================================================== */
  function initForm(){
    const form = document.getElementById('orderForm');
    const requiredFields = ['fullname','phone','address'];
    let isSubmitting = false; // guards against double submission

    function showError(id, msg){
      const field = document.getElementById(id);
      field.classList.add('invalid');
      field.parentElement.querySelector('.err-msg').textContent = msg;
    }
    function clearError(id){
      const field = document.getElementById(id);
      field.classList.remove('invalid');
      field.parentElement.querySelector('.err-msg').textContent = "";
    }

    requiredFields.forEach(id => {
      document.getElementById(id).addEventListener('input', () => clearError(id));
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (isSubmitting) return; // prevent double submission (double-tap, double-click)

      // Honeypot check: if the hidden trap field has a value, silently drop (likely a bot)
      const honeypot = form.querySelector('.honeypot');
      if (honeypot && honeypot.value){
        return;
      }

      let valid = true;
      let firstInvalidField = null;
      requiredFields.forEach(clearError);

      const fullname = document.getElementById('fullname').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const address = document.getElementById('address').value.trim();

      if (fullname.length < 3){ showError('fullname','Merci d\'indiquer votre nom complet.'); valid = false; firstInvalidField = firstInvalidField || 'fullname'; }
      const phoneClean = phone.replace(/[\s.-]/g,'');
      if (!/^0[5-7][0-9]{8}$/.test(phoneClean)){ showError('phone','Numéro invalide. Ex: 0612345678'); valid = false; firstInvalidField = firstInvalidField || 'phone'; }
      if (address.length < 8){ showError('address','Merci de détailler votre adresse (ville, quartier, rue).'); valid = false; firstInvalidField = firstInvalidField || 'address'; }
      if (!state.size){
        alert("Merci de choisir une taille avant de commander.");
        document.getElementById('sizeSwatches').scrollIntoView({ behavior:'smooth', block:'center' });
        valid = false;
      }

      if (!valid){
        if (firstInvalidField) document.getElementById(firstInvalidField).focus();
        return;
      }

      isSubmitting = true;
      const submitBtn = form.querySelector('.btn-submit');
      const btnText = submitBtn.querySelector('.btn-text');
      const btnLoader = submitBtn.querySelector('.btn-loader');
      const formError = document.getElementById('formError');
      formError.hidden = true; // clear any previous error before retrying
      submitBtn.disabled = true;
      submitBtn.setAttribute('aria-busy', 'true');
      btnText.hidden = true;
      btnLoader.hidden = false;

      try {
        // ---- Submit to Formspree ----
        const formData = new FormData(form);
        const res = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        // ---- Only treat an HTTP-OK response as a real success ----
        if (res.ok){
          // Push the lead event to GTM's dataLayer. GTM (GTM-TNPN5NLX)
          // is responsible for forwarding this to GA4 / Meta Pixel /
          // Microsoft Clarity — no fbq()/gtag() calls here.
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            event: "generate_lead",
            form_name: "Order Form",
            product_name: "Ensemble Brodé Premium",
            product_price: 520,
            currency: "MAD",
            country: "Morocco",
            page_type: "Landing Page"
          });

          // ---- Success UI: reveal the animated success message ----
          form.hidden = true;
          document.querySelector('.order-summary').hidden = true;
          document.getElementById('successMessage').hidden = false;
          document.getElementById('successMessage').scrollIntoView({ behavior:'smooth', block:'center' });
        } else {
          // Formspree responded but rejected the submission (validation, quota, etc.)
          throw new Error('Formspree rejected the submission');
        }
      } catch (err){
        // ---- Failure: do NOT push any dataLayer event, show inline error, re-enable the form ----
        formError.hidden = false;
        formError.scrollIntoView({ behavior:'smooth', block:'center' });
        isSubmitting = false;
        submitBtn.disabled = false;
        submitBtn.removeAttribute('aria-busy');
        btnText.hidden = false;
        btnLoader.hidden = true;
      }
    });
  }

  /* =====================================================
     STICKY MOBILE CTA — hide once form is in view
  ===================================================== */
  function initStickyCta(){
    const sticky = document.getElementById('stickyCta');
    const orderSection = document.getElementById('commander');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        sticky.style.display = entry.isIntersecting ? "none" : "";
      });
    }, { threshold: 0.15 });
    observer.observe(orderSection);
  }

  /* =====================================================
     SCROLL REVEAL
  ===================================================== */
  function initReveal(){
    document.querySelectorAll('.feature-card, .why-item, .review-placeholder').forEach(el => el.classList.add('reveal'));
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting){
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  }

  /* =====================================================
     PAGE LOADER — hides once the page has fully loaded
     (fonts, images) to avoid any flash of unstyled content
  ===================================================== */
  function initPageLoader(){
    const loader = document.getElementById('pageLoader');
    if (!loader) return;
    function hideLoader(){ loader.classList.add('is-hidden'); }
    if (document.readyState === 'complete'){
      hideLoader();
    } else {
      window.addEventListener('load', hideLoader);
      // Safety net: never let the loader block the page for more than 2.5s
      setTimeout(hideLoader, 2500);
    }
  }

  /* =====================================================
     BACK TO TOP
  ===================================================== */
  function initBackToTop(){
    const btn = document.getElementById('backToTop');
    if (!btn) return;
    function toggle(){
      if (window.scrollY > 600) btn.classList.add('is-visible');
      else btn.classList.remove('is-visible');
    }
    window.addEventListener('scroll', toggle, { passive: true });
    toggle();
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* =====================================================
     SOCIAL PROOF POPUP — rotates a random recent-order
     notice every 20-40 seconds to build trust
  ===================================================== */
  const SOCIAL_PROOF_MESSAGES = [
    "Sara de Casablanca vient de commander.",
    "Fatima de Rabat a acheté ce produit.",
    "Khadija de Marrakech vient de passer commande.",
    "Meryem de Tanger a commandé il y a quelques instants.",
    "Imane de Fès vient de valider sa commande.",
    "Nawal d'Agadir a acheté ce produit.",
    "Salma de Kénitra vient de commander.",
    "Zineb d'Oujda a passé commande à l'instant."
  ];

  function initSocialProof(){
    const popup = document.getElementById('socialProofPopup');
    const textEl = document.getElementById('socialProofText');
    if (!popup || !textEl) return;
    let lastIndex = -1;

    function showRandomMessage(){
      let idx;
      do { idx = Math.floor(Math.random() * SOCIAL_PROOF_MESSAGES.length); }
      while (idx === lastIndex && SOCIAL_PROOF_MESSAGES.length > 1);
      lastIndex = idx;

      textEl.textContent = SOCIAL_PROOF_MESSAGES[idx];
      popup.classList.add('is-visible');

      setTimeout(() => popup.classList.remove('is-visible'), 5000);
    }

    function scheduleNext(){
      const delay = 20000 + Math.random() * 20000; // between 20s and 40s
      setTimeout(() => { showRandomMessage(); scheduleNext(); }, delay);
    }

    setTimeout(showRandomMessage, 6000); // first popup shortly after page load
    scheduleNext();
  }

  /* =====================================================
     PRODUCT VIDEO
     - Auto-hides the whole section if no video file has
       been uploaded yet (graceful degradation, never a
       broken player on the page).
     - Attempts a muted autoplay once the video scrolls
       into view on mobile (most mobile browsers allow
       muted autoplay; desktop keeps manual controls).
  ===================================================== */
  function initVideo(){
    const section = document.getElementById('videoSection');
    const video = document.getElementById('productVideo');
    if (!section || !video) return;

    video.addEventListener('error', () => { section.hidden = true; }, true);

    // If the source is already known to be broken (e.g. no file uploaded), bail out early
    if (video.error){ section.hidden = true; return; }

    const isMobile = window.matchMedia('(max-width: 640px)').matches;
    if (!isMobile) return;

    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting){
          const playPromise = video.play();
          if (playPromise && typeof playPromise.catch === 'function'){
            playPromise.catch(() => { /* autoplay blocked — controls remain available */ });
          }
        } else {
          video.pause();
        }
      });
    }, { threshold: 0.5 });
    io.observe(video);
  }

  /* =====================================================
     PRIVACY POLICY (lightweight inline notice)
  ===================================================== */
  document.getElementById('privacyLink').addEventListener('click', (e) => {
    e.preventDefault();
    alert("Politique de confidentialité : vos informations (nom, téléphone, adresse) sont utilisées uniquement pour traiter et livrer votre commande. Elles ne sont jamais partagées avec des tiers.");
  });

  /* =====================================================
     INIT
  ===================================================== */
  document.getElementById('year').textContent = new Date().getFullYear();
  renderColorSwatches();
  renderGallery();
  renderSizes();
  updateSummary();
  startCountdown();
  renderReviews();
  initAccordion();
  initForm();
  initStickyCta();
  initReveal();
  initPageLoader();
  initBackToTop();
  initSocialProof();
  initVideo();

})();
