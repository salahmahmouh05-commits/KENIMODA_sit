(function(){
  "use strict";

  /* =====================================================
     PRODUCT DATA
  ===================================================== */
  const COLORS = [
    { name: "Marron",   hasPhoto: true,  images: ["assets/images/marron-1.jpg","assets/images/marron-2.jpg","assets/images/marron-3.jpg"] },
    { name: "Rose",      hasPhoto: true,  images: ["assets/images/rose-1.jpg","assets/images/rose-2.jpg","assets/images/rose-3.jpg","assets/images/rose-4.jpg"] },
    { name: "Bleu Ciel", hasPhoto: true,  images: ["assets/images/bleu-1.jpg","assets/images/bleu-2.jpg","assets/images/bleu-3.jpg","assets/images/bleu-4.jpg"] },
    { name: "Jaune",     hasPhoto: true,  images: ["assets/images/jaune-1.jpg","assets/images/jaune-2.jpg","assets/images/jaune-3.jpg","assets/images/jaune-4.jpg"] },
    { name: "Noir",      hasPhoto: false, images: [] },
    { name: "Beige",     hasPhoto: false, images: [] }
  ];
  const SWATCH_HEX = {
    "Marron":"#5C4033","Rose":"#E8AFC0","Bleu Ciel":"#A9C9E0",
    "Jaune":"#EBD98C","Noir":"#2B2420","Beige":"#D9C7AC"
  };
  const SIZES = ["38","40","42","44","46"];

  let state = { colorIndex: 1, size: null, imgIndex: 0 };

  /* =====================================================
     RENDER: COLOR SWATCHES
  ===================================================== */
  const colorSwatchesEl = document.getElementById('colorSwatches');
  const selectedColorLabel = document.getElementById('selectedColorLabel');
  const noPhotoNote = document.getElementById('noPhotoNote');

  function renderColorSwatches(){
    colorSwatchesEl.innerHTML = "";
    COLORS.forEach((c, i) => {
      const btn = document.createElement('button');
      btn.type = "button";
      btn.className = "swatch" + (i === state.colorIndex ? " active" : "") + (!c.hasPhoto ? " swatch-nophoto" : "");
      btn.setAttribute('aria-label', c.name);
      btn.innerHTML = `<span class="swatch-color" style="background:${SWATCH_HEX[c.name]}"></span>` +
        (!c.hasPhoto ? `<span class="swatch-avail-badge">Disponible</span>` : "");
      btn.addEventListener('click', () => selectColor(i));
      colorSwatchesEl.appendChild(btn);
    });
  }

  function selectColor(i){
    state.colorIndex = i;
    state.imgIndex = 0;
    const c = COLORS[i];
    selectedColorLabel.textContent = c.name;
    noPhotoNote.hidden = c.hasPhoto;
    renderColorSwatches();
    renderGallery();
    updateSummary();
  }

  /* =====================================================
     RENDER: GALLERY (hero image + thumbnails)
  ===================================================== */
  const mainImage = document.getElementById('mainImage');
  const thumbRow = document.getElementById('thumbRow');
  const zoomImage = document.getElementById('zoomImage');

  function renderGallery(){
    const c = COLORS[state.colorIndex];
    const images = c.hasPhoto ? c.images : ["assets/images/rose-1.jpg"]; // graceful fallback, never a broken image
    mainImage.style.opacity = 0;
    setTimeout(() => {
      mainImage.src = images[state.imgIndex] || images[0];
      mainImage.alt = `Ensemble Brodé Femme Premium coloris ${c.name}`;
      mainImage.style.opacity = 1;
    }, 120);

    thumbRow.innerHTML = "";
    images.forEach((src, idx) => {
      const t = document.createElement('div');
      t.className = "thumb" + (idx === state.imgIndex ? " active" : "");
      t.innerHTML = `<img src="${src}" alt="Miniature ${idx+1}" loading="lazy">`;
      t.addEventListener('click', () => { state.imgIndex = idx; renderGallery(); });
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
    const c = COLORS[state.colorIndex];
    const images = c.hasPhoto ? c.images : [];
    if (!images.length) return;
    if (dx < -40) { state.imgIndex = (state.imgIndex + 1) % images.length; renderGallery(); }
    if (dx > 40)  { state.imgIndex = (state.imgIndex - 1 + images.length) % images.length; renderGallery(); }
  }, { passive:true });

  /* =====================================================
     ZOOM MODAL
  ===================================================== */
  const zoomModal = document.getElementById('zoomModal');
  document.getElementById('zoomBtn').addEventListener('click', () => {
    zoomImage.src = mainImage.src;
    zoomModal.hidden = false;
  });
  document.getElementById('closeZoomModal').addEventListener('click', () => zoomModal.hidden = true);
  zoomModal.addEventListener('click', e => { if (e.target === zoomModal) zoomModal.hidden = true; });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape'){
      zoomModal.hidden = true;
      sizeModal.hidden = true;
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
      btn.addEventListener('click', () => {
        state.size = s;
        selectedSizeLabel.textContent = s;
        renderSizes();
        updateSummary();
      });
      sizeSwatchesEl.appendChild(btn);
    });
  }

  /* =====================================================
     SIZE GUIDE MODAL
  ===================================================== */
  const sizeModal = document.getElementById('sizeModal');
  document.getElementById('openSizeGuide').addEventListener('click', () => sizeModal.hidden = false);
  document.getElementById('closeSizeModal').addEventListener('click', () => sizeModal.hidden = true);
  sizeModal.addEventListener('click', e => { if (e.target === sizeModal) sizeModal.hidden = true; });

  /* =====================================================
     ORDER SUMMARY SYNC
  ===================================================== */
  function updateSummary(){
    const c = COLORS[state.colorIndex];
    document.getElementById('summaryImg').src = c.hasPhoto ? c.images[0] : "assets/images/rose-1.jpg";
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
     REVIEWS
  ===================================================== */
  const REVIEWS = [
    { name:"Salma B.", city:"Casablanca", text:"Qualité vraiment premium, la broderie est magnifique en vrai. Livraison en 1 jour !" },
    { name:"Imane K.", city:"Rabat", text:"Exactement conforme aux photos. Le tissu est doux et la coupe est très flatteuse." },
    { name:"Fatima Zahra L.", city:"Marrakech", text:"J'ai commandé pour l'Aïd, tout le monde m'a complimentée. Merci bzf !" },
    { name:"Khadija R.", city:"Fès", text:"Paiement à la livraison, aucun souci. Le livreur était rapide et poli." },
    { name:"Nawal T.", city:"Tanger", text:"Couleur rose sublime, taille parfaite. Je recommande à 100%." },
    { name:"Meryem A.", city:"Agadir", text:"Très bon rapport qualité prix, j'ai pris deux couleurs différentes." },
    { name:"Hanane S.", city:"Kénitra", text:"Le service client sur WhatsApp a répondu très vite à mes questions." },
    { name:"Zineb E.", city:"Oujda", text:"Ensemble élégant, parfait pour un mariage. Je vais recommander bientôt." }
  ];

  function renderReviews(){
    const grid = document.getElementById('reviewsGrid');
    grid.innerHTML = REVIEWS.map(r => `
      <div class="review-card reveal">
        <div class="review-stars">★★★★★</div>
        <p>"${r.text}"</p>
        <div class="review-name">${r.name}</div>
        <div class="review-city">${r.city}</div>
      </div>
    `).join("");
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
        });
        if (!isOpen){
          item.classList.add('open');
          panel.style.maxHeight = panel.scrollHeight + "px";
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
      let valid = true;

      requiredFields.forEach(clearError);

      const fullname = document.getElementById('fullname').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const address = document.getElementById('address').value.trim();

      if (fullname.length < 3){ showError('fullname','Merci d\'indiquer votre nom complet.'); valid = false; }
      const phoneClean = phone.replace(/[\s.-]/g,'');
      if (!/^0[5-7][0-9]{8}$/.test(phoneClean)){ showError('phone','Numéro invalide. Ex: 0612345678'); valid = false; }
      if (address.length < 8){ showError('address','Merci de détailler votre adresse (ville, quartier, rue).'); valid = false; }
      if (!state.size){
        alert("Merci de choisir une taille avant de commander.");
        document.getElementById('sizeSwatches').scrollIntoView({ behavior:'smooth', block:'center' });
        valid = false;
      }

      if (!valid) return;

      const submitBtn = form.querySelector('.btn-submit');
      const btnText = submitBtn.querySelector('.btn-text');
      const btnLoader = submitBtn.querySelector('.btn-loader');
      btnText.style.opacity = "0.6";
      submitBtn.disabled = true;

      try {
        const formData = new FormData(form);
        const res = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });
        if (res.ok){
          form.hidden = true;
          document.querySelector('.order-summary').hidden = true;
          document.getElementById('successMessage').hidden = false;
          document.getElementById('successMessage').scrollIntoView({ behavior:'smooth', block:'center' });
        } else {
          throw new Error('Submission failed');
        }
      } catch (err){
        alert("Une erreur est survenue. Merci de réessayer ou de nous contacter sur WhatsApp.");
        btnText.style.opacity = "1";
        submitBtn.disabled = false;
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
    document.querySelectorAll('.feature-card, .why-item, .review-card').forEach(el => el.classList.add('reveal'));
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

})();
