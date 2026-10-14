/**
 * Nidhi N D - Professional Portfolio Engine (2026 Edition)
 * Micro-animations, Particle Canvas, Dynamic Typing & Smooth Interactions
 */

document.addEventListener("DOMContentLoaded", () => {
  initParticleCanvas();
  initTypingEffect();
  initScrollAnimations();
  initStatsCounter();
  initProjectFilters();
  initMobileNav();
  initContactCopy();
  initNavbarScroll();
});

/* ==========================================================================
   1. Interactive Animated Particle Canvas Background
   ========================================================================== */
function initParticleCanvas() {
  const canvas = document.getElementById("bg-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particleCount = window.innerWidth < 768 ? 35 : 70;
  const particles = [];

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.6;
      this.vy = (Math.random() - 0.5) * 0.6;
      this.radius = Math.random() * 2 + 1;
      this.alpha = Math.random() * 0.5 + 0.2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      if (this.y > height) this.y = 0;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(165, 180, 252, ${this.alpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Draw connecting constellation lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          const alpha = (1 - dist / 120) * 0.15;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    particles.forEach((p) => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   2. Dynamic Hero Typing Effect
   ========================================================================== */
function initTypingEffect() {
  const typingElement = document.getElementById("typing-text");
  if (!typingElement) return;

  const phrases = [
    "On-Device AI Copilots (Hexagon NPU)",
    "Full-Stack RAG Workspaces",
    "High-Performance Java & DSA Systems",
    "Native Android Applications",
    "Embedded Healthcare IoT Prototypes"
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingDelay = 80;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingDelay = 40;
    } else {
      typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingDelay = 90;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      typingDelay = 1800; // Pause at end of phrase
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingDelay = 400; // Pause before typing new phrase
    }

    setTimeout(type, typingDelay);
  }

  type();
}

/* ==========================================================================
   3. Animated Metric Counter Cards
   ========================================================================== */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll(".stat-number");
  if (!statNumbers.length) return;

  let hasAnimated = false;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true;
          statNumbers.forEach((el) => {
            const target = parseFloat(el.getAttribute("data-target"));
            const decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
            const suffix = el.getAttribute("data-suffix") || "";
            const duration = 1600;
            const startTime = performance.now();

            function updateCounter(currentTime) {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              // Ease-out expo curve
              const easeProgress = 1 - Math.pow(1 - progress, 3);
              const currentVal = easeProgress * target;

              el.textContent = currentVal.toFixed(decimals) + suffix;

              if (progress < 1) {
                requestAnimationFrame(updateCounter);
              } else {
                el.textContent = target.toFixed(decimals) + suffix;
              }
            }

            requestAnimationFrame(updateCounter);
          });
        }
      });
    },
    { threshold: 0.3 }
  );

  const statsSection = document.querySelector(".stats-grid");
  if (statsSection) observer.observe(statsSection);
}

/* ==========================================================================
   4. Project Filtering System
   ========================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      projectCards.forEach((card) => {
        const categories = card.getAttribute("data-category") || "";
        if (filter === "all" || categories.includes(filter)) {
          card.style.display = "flex";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, 20);
        } else {
          card.style.opacity = "0";
          card.style.transform = "translateY(15px)";
          setTimeout(() => {
            card.style.display = "none";
          }, 250);
        }
      });
    });
  });
}

/* ==========================================================================
   5. Mobile Navigation Menu Drawer
   ========================================================================== */
function initMobileNav() {
  const hamburger = document.getElementById("hamburger-btn");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-item");

  if (!hamburger || !navMenu) return;

  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("open");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
    });
  });

  // Highlight active link on scroll
  window.addEventListener("scroll", () => {
    let current = "";
    const sections = document.querySelectorAll("section");

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= sectionTop - 120) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
}

/* ==========================================================================
   6. 1-Click Copy Email & Toast Notification
   ========================================================================== */
function initContactCopy() {
  const copyBtn = document.getElementById("copy-email-btn");
  const toast = document.getElementById("toast");
  const toastMsg = document.getElementById("toast-msg");
  const contactForm = document.getElementById("contact-form");

  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      const email = "nidhindgowda@gmail.com";
      navigator.clipboard.writeText(email).then(() => {
        showToast("Email copied to clipboard!");
      }).catch(() => {
        showToast("nidhindgowda@gmail.com");
      });
    });
  }

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;

      // Open user's email client with prefilled mailto
      const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
      const body = encodeURIComponent(`Name: ${name}
Email: ${email}

Message:
${message}`);
      window.location.href = `mailto:nidhindgowda@gmail.com?subject=${subject}&body=${body}`;

      showToast("Opening email client...");
      contactForm.reset();
    });
  }

  function showToast(text) {
    if (!toast) return;
    toastMsg.textContent = text;
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  }
}

/* ==========================================================================
   7. Navbar Scroll Glass Effect
   ========================================================================== */
function initNavbarScroll() {
  const navbar = document.querySelector(".navbar-wrapper");
  if (!navbar) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
}

/* ==========================================================================
   8. Scroll Reveal Observer
   ========================================================================== */
function initScrollAnimations() {
  const reveals = document.querySelectorAll(".glass-card, .skill-category-card, .project-card, .cert-card, .edu-card");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  reveals.forEach((el) => {
    revealObserver.observe(el);
  });
}
