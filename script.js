document.addEventListener("DOMContentLoaded", () => {
  initMobileMenuDrawer();
  evaluateGlobalAuthState();
  setupFormSubmitHandlers();
});

// Fine-tuned clean menu drawer controller mapped from MentorHub logic metrics
function initMobileMenuDrawer() {
  const toggleBtn = document.querySelector(".menu-open-close");
  const menuDrawer = document.querySelector("#mobile-menu");

  if (!toggleBtn || !menuDrawer) return;

  // Toggle open/close on button click
  toggleBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleBtn.classList.toggle("is-open");
    menuDrawer.classList.toggle("is-open");
  });

  // Smart Event Delegation: Automatically close when clicking any inner option link
  menuDrawer.addEventListener("click", (e) => {
    if (e.target.closest("a") || e.target.closest(".btn")) {
      toggleBtn.classList.remove("is-open");
      menuDrawer.classList.remove("is-open");
    }
  });
}

// Highlight active nav link
(() => {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document
    .querySelectorAll("#menu a .btn, #mobile-menu a .btn")
    .forEach((btn) => {
      const href = btn.closest("a").getAttribute("href");
      if (href === currentPage) {
        btn.classList.add("active");
      }
    });
})();

/* ---- Password show/hide toggle ---- */
function togglePwd(fieldId, btn) {
  const field = document.getElementById(fieldId);
  if (field.type === "password") {
    field.type = "text";
    btn.textContent = "🙈";
  } else {
    field.type = "password";
    btn.textContent = "👁";
  }
}

/* ---- Password strength indicator ---- */
function checkStrength(val) {
  const bars = [bar1, bar2, bar3, bar4];
  const label = document.getElementById("strength-label");
  if (!label) return;

  bars.forEach((b) => {
    b.className = "strength-bar";
  });

  let score = 0;
  if (val.length >= 8) score++;
  if (/[A-Z]/.test(val)) score++;
  if (/[0-9]/.test(val)) score++;
  if (/[^A-Za-z0-9]/.test(val)) score++;

  const labels = ["", "Weak", "Fair", "Good", "Strong"];
  const colors = ["", "weak", "medium", "medium", "strong"];

  for (let i = 0; i < score; i++) {
    bars[i].classList.add(colors[score]);
  }

  label.textContent = val.length ? labels[score] : "";
  label.style.color = score === 4 ? "#0f6e56" : score >= 2 ? "#f59e0b" : "#ef4444";
}

/* ---- Confirm password match hint ---- */
function checkMatch() {
  const pwd = document.getElementById("password").value;
  const confirm = document.getElementById("confirm-password").value;
  const hint = document.getElementById("match-hint");

  if (!confirm) {
    hint.textContent = "";
    return;
  }

  if (pwd === confirm) {
    hint.textContent = "✓ Passwords match";
    hint.style.color = "#0f6e56";
  } else {
    hint.textContent = "✗ Passwords do not match";
    hint.style.color = "#ef4444";
  }
}

/* ---- Register button handler ---- */
function handleRegister() {
  const terms = document.getElementById("terms-check");
  if (!terms.checked) {
    terms.closest(".reg-terms").style.outline = "2px solid #ef4444";
    terms.closest(".reg-terms").style.borderRadius = "8px";
    setTimeout(() => {
      terms.closest(".reg-terms").style.outline = "none";
    }, 2000);
    return;
  }
}

/* ---- Checks browser cache state to structurally update layout blocks visibility states ---- */
function evaluateGlobalAuthState() {
  const isLoggedIn = localStorage.getItem("praxes_user_logged_in") === "true";
  const guestDesktop = document.getElementById("guest-nav-block");
  const userDesktop = document.getElementById("user-nav-block");
  const guestMobile = document.getElementById("guest-nav-block-mobile");
  const userMobile = document.getElementById("user-nav-block-mobile");

  if (guestDesktop && userDesktop) {
    if (isLoggedIn) {
      guestDesktop.classList.add("auth-hidden");
      userDesktop.classList.remove("auth-hidden");
    } else {
      guestDesktop.classList.remove("auth-hidden");
      userDesktop.classList.add("auth-hidden");
    }
  }

  if (guestMobile && userMobile) {
    if (isLoggedIn) {
      guestMobile.classList.add("auth-hidden");
      userMobile.classList.remove("auth-hidden");
    } else {
      guestMobile.classList.remove("auth-hidden");
      userMobile.classList.add("auth-hidden");
    }
  }
}

// Global toggle engine for PC absolute profile popup window frame
function toggleProfileDropdown(event) {
  event.stopPropagation();
  const menu = document.getElementById("profileDropdownCard");
  if (menu) {
    menu.classList.toggle("show");
  }
}

// Global click monitoring framework to dismiss open drop-downs cleanly
window.addEventListener("click", () => {
  const menu = document.getElementById("profileDropdownCard");
  if (menu && menu.classList.contains("show")) {
    menu.classList.remove("show");
  }
});

// Hooks event handlers to login/registration submit paths
function setupFormSubmitHandlers() {
  const loginSubmitBtn = document.getElementById("loginSubmitBtn");
  if (loginSubmitBtn) {
    loginSubmitBtn.addEventListener("click", () => {
      const user = document.getElementById("username") ? document.getElementById("username").value : "";
      const pass = document.getElementById("password") ? document.getElementById("password").value : "";

      if (!user.trim() || !pass.trim()) {
        alert("Please write valid access credentials.");
        return;
      }

      localStorage.setItem("praxes_user_logged_in", "true");
      window.location.href = "index.html";
    });
  }
}

// Clear token values from cache database and reload state environments
function simulateLogout() {
  localStorage.removeItem("praxes_user_logged_in");
  window.location.href = "index.html";
}

/* ---- Shared Automated Scroll-To-Top Injector Script ---- */
window.addEventListener("DOMContentLoaded", () => {
  const scrollTopBtn = document.createElement("button");
  scrollTopBtn.className = "scroll-top-btn";
  scrollTopBtn.innerHTML = `<img src="scrollup.svg" alt="Scroll Up" style="width: 22px; height: 22px; display: block; margin: auto;" />`;
  document.body.appendChild(scrollTopBtn);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add("is-visible");
    } else {
      scrollTopBtn.classList.remove("is-visible");
    }
  });

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});