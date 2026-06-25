var openOrClose = 0;
const menuOpenClose = document.querySelector(".menu-open-close");
const menuImg = document.querySelector(".menuImg");

menuOpenClose.addEventListener("click", () => {
  if (openOrClose === 0) {
    menuImg.src = "close.svg";
    openOrClose = 1; 
    gsap.to("#mobile-menu", {
      height: "auto",
      display: "flex",
      visibility: "visible",
      opacity: 1,
      duration: 0.32,
    });
  } else {
    menuImg.src = "menu.svg";
    openOrClose = 0;
    gsap.to("#mobile-menu", {
      height: 0,
      opacity: 0,
      duration: 0.28,
      onComplete: () => {
        document.querySelector("#mobile-menu").style.display = "none";
        document.querySelector("#mobile-menu").style.visibility = "hidden";
      },
    });
  }
});

// Highlight active nav link
(function () {
  const page = window.location.pathname.split("/").pop() || "index.html";
  document
    .querySelectorAll("#menu a .btn, #mobile-menu a .btn")
    .forEach((btn) => {
      const href = btn.closest("a").getAttribute("href");
      if (href === page) btn.classList.add("active");
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
  const classes = ["", "weak", "medium", "medium", "strong"];

  // Reset
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
  label.style.color =
    score === 4 ? "#0f6e56" : score >= 2 ? "#f59e0b" : "#ef4444";
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

/* =========================================================================
   AUTHENTICATION PROFILE STATE MACHINE ENGINE
   ========================================================================= */

document.addEventListener("DOMContentLoaded", () => {
  evaluateGlobalAuthState();
  setupFormSubmitHandlers();
});

// Checks browser cache state to structurally update both desktop and mobile headers
function evaluateGlobalAuthState() {
  const isLoggedIn = localStorage.getItem("praxes_user_logged_in") === "true";
  
  const guestDesktop = document.getElementById("guest-nav-block");
  const userDesktop = document.getElementById("user-nav-block");
  
  const guestMobile = document.getElementById("guest-nav-block-mobile");
  const userMobile = document.getElementById("user-nav-block-mobile");

  // 1. Process Desktop Navbar Blocks if present in DOM
  if (guestDesktop && userDesktop) {
    if (isLoggedIn) {
      guestDesktop.classList.add("auth-hidden");
      userDesktop.classList.remove("auth-hidden");
    } else {
      guestDesktop.classList.remove("auth-hidden");
      userDesktop.classList.add("auth-hidden");
    }
  }

  // 2. Process Mobile Menu Drawer Blocks if present in DOM
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

// Hooks event handlers to login/registration submit paths to set local storage tokens
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
      // alert("Login successful!");
      window.location.href = "index.html";
    });
  }
}

// Clear token values from cache database and reload state environments
function simulateLogout() {
  localStorage.removeItem("praxes_user_logged_in");
  // alert("Logged out successfully.");
  window.location.href = "index.html";
}


// --- Shared Global Scroll-To-Top Script ---
window.addEventListener('DOMContentLoaded', () => {
  // 1. Create the button element dynamically so you don't have to write HTML on every page
  const scrollTopBtn = document.createElement('button');
  scrollTopBtn.className = 'scroll-top-btn';
  scrollTopBtn.innerHTML = `<img src="scrollup.svg" alt="Scroll Up" style="width: 22px; height: 22px; display: block; margin: auto;" />`;
  document.body.appendChild(scrollTopBtn);

  // 2. Listen for scroll events to show or hide the button smoothly
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add('is-visible');
    } else {
      scrollTopBtn.classList.remove('is-visible');
    }
  });

  // 3. Make the button smoothly scroll all the way up when clicked
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Native browser smooth scrolling acceleration
    });
  });
});