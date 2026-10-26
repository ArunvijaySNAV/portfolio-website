/**
 * ============================================================================
 * JEWELLERY VIDEO CREATOR PORTFOLIO - CORE LOGIC & CONFIGURATION
 * ============================================================================
 * 
 * Instructions:
 * 1. Replace the URLs in the VIDEOS array below with your hosted video & poster links
 *    (e.g., Cloudflare R2, BunnyCDN, Vimeo, AWS S3).
 * 2. Replace the contact info in the CONFIG object with your actual phone, email, and handles.
 * 3. The page renders gracefully even if remote videos fail or are placeholders.
 */

// ============================================================================
// 1. VIDEOS CONFIGURATION OBJECT (Edit URLs here)
// ============================================================================
const VIDEOS = [
  {
    id: "ugc-1",
    title: "The Heirloom Unboxing",
    type: "ugc",
    ratio: "9:16",
    concept: "Authentic creator first-person unboxing driving high-intent checkout for fine choker sets.",
    // Replace with your hosted video URLs (or keep local paths)
    src: "videos/ugc-1.mp4",
    preview: "assets/previews/ugc-1-preview.mp4",
    poster: "assets/posters/ugc-1.jpg"
  },
  {
    id: "ugc-2",
    title: "Everyday Velvet Touch",
    type: "ugc",
    ratio: "9:16",
    concept: "Relatable lifestyle try-on highlighting tactile unboxing and effortless daily elegance.",
    // Replace with your hosted video URLs (or keep local paths)
    src: "videos/ugc-2.mp4",
    preview: "assets/previews/ugc-2-preview.mp4",
    poster: "assets/posters/ugc-2.jpg"
  },
  {
    id: "motion-1",
    title: "Heritage Temple Gold",
    type: "motion",
    ratio: "9:16",
    concept: "Cinematic 3D camera glide capturing museum-grade craftsmanship and gemstone radiance.",
    // Replace with your hosted video URLs (or keep local paths)
    src: "videos/3D-motion.mp4",
    preview: "assets/previews/motion-1-preview-9x16.mp4",
    poster: "assets/posters/motion-1-vertical.jpg"
  }
];

// ============================================================================
// 2. CREATOR DETAILS & CONTACT CONFIGURATION
// ============================================================================
const CONFIG = {
  studioName: "brand AI ads",
  creatorName: "Arun Vijay",
  // Phone number with country code (91 + 6302705710)
  whatsappPhone: "916302705710", 
  whatsappDefaultMessage: "Hi, I saw your portfolio and want a jewellery video.",
  email: "arunvijaysnav.business@gmail.com",
  linkedinUrl: "https://www.linkedin.com/in/arunvijaysnav/",
  turnaroundDays: "3–5 business days"
};

// ============================================================================
// 3. INITIALIZATION & DOM READY
// ============================================================================
document.addEventListener("DOMContentLoaded", () => {
  applyCreatorConfig();
  renderWorkTiles();
  setupStickyHeader();
  setupMobileMenu();
  setupLightboxPlayer();
  setupContactForm();
  setupEmailCopy();
  setupScrollAnimations();
});

// ============================================================================
// 4. APPLY CREATOR CONFIGURATION TO DOM
// ============================================================================
function applyCreatorConfig() {
  // Studio logo text
  const studioLogo = document.getElementById("studioLogoText");
  if (studioLogo) studioLogo.textContent = CONFIG.studioName;

  // WhatsApp URLs
  const encodedMsg = encodeURIComponent(CONFIG.whatsappDefaultMessage);
  const waUrl = `https://wa.me/${CONFIG.whatsappPhone}?text=${encodedMsg}`;

  document.querySelectorAll(".whatsapp-link").forEach((link) => {
    link.href = waUrl;
  });

  // Email placeholders
  const emailText = document.getElementById("emailPlaceholderText");
  const emailLink = document.getElementById("emailPlaceholderLink");
  if (emailText) emailText.textContent = CONFIG.email;
  if (emailLink) emailLink.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent("Jewellery Video Inquiry")}`;

  // Social Links
  const linkedinPlaceholder = document.getElementById("linkedinPlaceholder");
  const linkedinLink = document.getElementById("linkedinLink");
  if (linkedinPlaceholder) linkedinPlaceholder.textContent = "arunvijaysnav";
  if (linkedinLink) linkedinLink.href = CONFIG.linkedinUrl;

  // Turnaround placeholder
  const turnaroundElem = document.getElementById("turnaroundPlaceholder");
  if (turnaroundElem) turnaroundElem.textContent = CONFIG.turnaroundDays;

  // Year & Creator Name in Footer
  const yearElem = document.getElementById("currentYear");
  if (yearElem) yearElem.textContent = new Date().getFullYear();

  const creatorFooter = document.getElementById("creatorNameFooter");
  if (creatorFooter) creatorFooter.textContent = CONFIG.creatorName;
}

// ============================================================================
// 5. RENDER WORK TILES DYNAMICALLY FROM VIDEOS ARRAY
// ============================================================================
function renderWorkTiles() {
  const grid = document.getElementById("workGrid");
  if (!grid) return;

  grid.innerHTML = "";

  VIDEOS.forEach((item, index) => {
    const tile = document.createElement("article");
    tile.className = `work-tile tile-${item.type} fade-up`;
    tile.setAttribute("role", "button");
    tile.setAttribute("tabindex", "0");
    tile.setAttribute("aria-label", `Open ${item.title} video player`);
    tile.dataset.videoId = item.id;

    const badgeLabel = item.type === "motion" ? "3D Motion" : "UGC Ad";

    tile.innerHTML = `
      <div class="tile-media-wrapper">
        <img class="tile-poster" 
             src="${item.poster}" 
             alt="${item.title} poster" 
             loading="lazy" />
        
        <video class="tile-video-preview" 
               muted 
               loop 
               playsinline 
               preload="none">
          <source src="${item.preview}" type="video/mp4" />
        </video>

        <div class="tile-overlay">
          <span class="tile-badge-pill">${badgeLabel}</span>
          <div class="tile-play-indicator" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5V19L19 12L8 5Z"/>
            </svg>
          </div>
        </div>
      </div>

      <div class="tile-info">
        <h3 class="tile-title">${item.title}</h3>
        <p class="tile-concept">${item.concept}</p>
      </div>
    `;

    const videoElem = tile.querySelector(".tile-video-preview");
    const posterElem = tile.querySelector(".tile-poster");

    // Graceful error fallback: if video fails to load, keep poster visible
    if (videoElem) {
      videoElem.addEventListener("error", () => {
        tile.classList.remove("is-previewing");
        videoElem.style.display = "none";
      });
    }

    // Desktop hover preview interactions
    let playPromise = null;

    tile.addEventListener("mouseenter", () => {
      if (window.matchMedia("(pointer: fine)").matches && videoElem) {
        tile.classList.add("is-previewing");
        playPromise = videoElem.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Autoplay policy prevented playback, keep poster visible
            tile.classList.remove("is-previewing");
          });
        }
      }
    });

    tile.addEventListener("mouseleave", () => {
      if (window.matchMedia("(pointer: fine)").matches && videoElem) {
        tile.classList.remove("is-previewing");
        if (playPromise !== undefined) {
          playPromise.then(() => {
            videoElem.pause();
            videoElem.currentTime = 0;
          }).catch(() => {});
        } else {
          videoElem.pause();
          videoElem.currentTime = 0;
        }
      }
    });

    // Click / Enter key opens full Lightbox
    tile.addEventListener("click", () => {
      openLightbox(item);
    });

    tile.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightbox(item);
      }
    });

    grid.appendChild(tile);
  });
}

// ============================================================================
// 6. LIGHTBOX MODAL PLAYER (Modern Web Guidance Compliant)
// ============================================================================
let activeLightboxItem = null;

function setupLightboxPlayer() {
  const dialog = document.getElementById("videoLightbox");
  const closeBtn = document.getElementById("lightboxCloseBtn");
  const videoElem = document.getElementById("lightboxVideo");
  const stage = document.getElementById("lightboxStage");

  if (!dialog) return;

  // Close on 'X' button
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      closeLightbox();
    });
  }

  // Close on native ESC or close event
  dialog.addEventListener("close", () => {
    cleanupLightbox();
  });

  // Modern Web Guidance: Light Dismiss Fallback for Safari/browsers without closedBy
  if (!("closedBy" in HTMLDialogElement.prototype)) {
    dialog.addEventListener("click", (event) => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      const isContent = (
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width
      );
      if (!isContent) {
        closeLightbox();
      }
    });
  }

  // Graceful degradation when full video fails to load or is placeholder
  if (videoElem) {
    videoElem.addEventListener("error", () => {
      if (stage) {
        stage.classList.add("show-fallback");
      }
    });
  }
}

function openLightbox(item) {
  const dialog = document.getElementById("videoLightbox");
  const title = document.getElementById("lightboxTitle");
  const tag = document.getElementById("lightboxTag");
  const concept = document.getElementById("lightboxConcept");
  const video = document.getElementById("lightboxVideo");
  const source = document.getElementById("lightboxSource");
  const posterFallback = document.getElementById("lightboxPosterFallback");
  const stage = document.getElementById("lightboxStage");
  const waBtn = document.getElementById("lightboxWhatsappBtn");

  if (!dialog || !video || !source) return;

  activeLightboxItem = item;

  // Set Metadata
  if (title) title.textContent = item.title;
  if (tag) tag.textContent = item.type === "motion" ? "3D Motion Film" : "UGC Video Ad";
  if (concept) concept.textContent = item.concept;

  // Update WhatsApp direct button with custom concept prefilled
  if (waBtn) {
    const customMsg = `Hi, I saw "${item.title}" (${item.type === "motion" ? "3D Motion" : "UGC"}) in your portfolio and want a similar video for my jewellery brand.`;
    waBtn.href = `https://wa.me/${CONFIG.whatsappPhone}?text=${encodeURIComponent(customMsg)}`;
  }

  // Set Video & Fallback Poster
  if (stage) stage.classList.remove("show-fallback");
  if (posterFallback) {
    posterFallback.src = item.poster;
    posterFallback.alt = item.title;
  }

  // Check if URL is an explicit placeholder or missing
  const isPlaceholder = !item.src || item.src.includes("PLACEHOLDER");
  if (isPlaceholder) {
    if (stage) stage.classList.add("show-fallback");
  } else {
    source.src = item.src;
    video.load();
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay with sound may be blocked until user interacts with video controls
      });
    }
  }

  // Open native dialog modal
  if (typeof dialog.showModal === "function") {
    dialog.showModal();
  } else {
    dialog.setAttribute("open", "");
  }
}

function closeLightbox() {
  const dialog = document.getElementById("videoLightbox");
  if (dialog && dialog.open) {
    dialog.close();
  }
  cleanupLightbox();
}

function cleanupLightbox() {
  const video = document.getElementById("lightboxVideo");
  const source = document.getElementById("lightboxSource");
  if (video) {
    video.pause();
    video.currentTime = 0;
  }
  if (source) {
    source.removeAttribute("src");
  }
  activeLightboxItem = null;
}

// ============================================================================
// 7. STICKY HEADER SCROLL EFFECT
// ============================================================================
function setupStickyHeader() {
  const header = document.getElementById("header");
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
}

// ============================================================================
// 8. MOBILE HAMBURGER MENU
// ============================================================================
function setupMobileMenu() {
  const toggleBtn = document.getElementById("mobileMenuToggle");
  const menu = document.getElementById("mobileMenu");
  const links = document.querySelectorAll(".mobile-nav-link");

  if (!toggleBtn || !menu) return;

  const toggleMenu = () => {
    const isOpen = menu.classList.contains("open");
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  const openMenu = () => {
    menu.classList.add("open");
    toggleBtn.classList.add("active");
    toggleBtn.setAttribute("aria-expanded", "true");
    menu.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeMenu = () => {
    menu.classList.remove("open");
    toggleBtn.classList.remove("active");
    toggleBtn.setAttribute("aria-expanded", "false");
    menu.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  toggleBtn.addEventListener("click", toggleMenu);

  links.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("open")) {
      closeMenu();
    }
  });
}

// ============================================================================
// 9. MINIMAL CONTACT FORM HANDLER
// ============================================================================
function setupContactForm() {
  const form = document.getElementById("contactForm");
  const submitBtn = document.getElementById("submitFormBtn");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nameInput = document.getElementById("contactName");
    const brandInput = document.getElementById("contactBrand");
    const msgInput = document.getElementById("contactMessage");

    let isValid = true;

    // Validate fields
    [nameInput, brandInput, msgInput].forEach((input) => {
      const group = input.closest(".form-group");
      if (!input.value.trim()) {
        group.classList.add("has-error");
        isValid = false;
      } else {
        group.classList.remove("has-error");
      }

      // Clear error on input
      input.addEventListener("input", () => {
        group.classList.remove("has-error");
      }, { once: true });
    });

    if (!isValid) return;

    // Simulated submit state
    if (submitBtn) submitBtn.classList.add("loading");

    const name = nameInput.value.trim();
    const brand = brandInput.value.trim();
    const message = msgInput.value.trim();

    // Prepare mailto fallback URL
    const mailtoSubject = `Jewellery Video Inquiry from ${name} (${brand})`;
    const mailtoBody = `Name: ${name}\nBrand: ${brand}\n\nMessage:\n${message}\n\nSent via Portfolio Website`;
    const mailtoLink = `mailto:${CONFIG.email}?subject=${encodeURIComponent(mailtoSubject)}&body=${encodeURIComponent(mailtoBody)}`;

    setTimeout(() => {
      if (submitBtn) submitBtn.classList.remove("loading");
      form.reset();

      // Show friendly confirmation toast
      showToast("Thank you! Opening email client to send your message...");

      // Trigger mailto fallback after short delay
      setTimeout(() => {
        window.location.href = mailtoLink;
      }, 700);
    }, 600);
  });
}

// ============================================================================
// 10. COPY EMAIL UTILITY
// ============================================================================
function setupEmailCopy() {
  const copyBtn = document.getElementById("copyEmailBtn");
  const feedback = document.getElementById("copyFeedback");

  if (!copyBtn) return;

  copyBtn.addEventListener("click", async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(CONFIG.email);
      } else {
        // Fallback for older browsers
        const textarea = document.createElement("textarea");
        textarea.value = CONFIG.email;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }

      if (feedback) {
        feedback.classList.add("show");
        setTimeout(() => {
          feedback.classList.remove("show");
        }, 2000);
      }

      showToast("Email address copied to clipboard!");
    } catch (err) {
      window.location.href = `mailto:${CONFIG.email}`;
    }
  });
}

// ============================================================================
// 11. TOAST NOTIFICATION
// ============================================================================
let toastTimer = null;

function showToast(message) {
  const toast = document.getElementById("toastNotification");
  const text = document.getElementById("toastMessage");
  if (!toast || !text) return;

  text.textContent = message;
  toast.classList.add("show");

  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 4000);
}

// ============================================================================
// 12. SCROLL ANIMATIONS (IntersectionObserver Fade-Up)
// ============================================================================
function setupScrollAnimations() {
  if (!("IntersectionObserver" in window)) {
    document.querySelectorAll(".fade-up").forEach((el) => {
      el.classList.add("is-visible");
    });
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: "0px 0px 120px 0px",
    threshold: 0.01
  });

  document.querySelectorAll(".fade-up").forEach((el) => {
    observer.observe(el);
  });
}
