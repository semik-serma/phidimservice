/* ============================================
   Phidim Login Page - Main JavaScript
   ============================================ */

(function () {
  'use strict';

  /* ==========================================
     DOM References
     ========================================== */
  const passwordToggle = document.getElementById('passwordToggle');
  const passwordInput = document.getElementById('password');
  const loginForm = document.getElementById('loginForm');
  const signInBtn = document.getElementById('signInBtn');
  const emailInput = document.getElementById('email');
  const emailError = document.getElementById('emailError');
  const passwordError = document.getElementById('passwordError');
  const rememberMe = document.getElementById('rememberMe');
  const forgotLink = document.getElementById('forgotLink');
  const cursorGlow = document.getElementById('cursorGlow');
  const canvas = document.getElementById('particleCanvas');
  const ctx = canvas.getContext('2d');
  const toastContainer = document.getElementById('toastContainer');

  /* ==========================================
     Password Visibility Toggle
     ========================================== */
  passwordToggle.addEventListener('click', function () {
    const isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password';

    const eyeOpen = passwordToggle.querySelector('.eye-open');
    const eyeClosed = passwordToggle.querySelector('.eye-closed');

    if (isPassword) {
      eyeOpen.style.display = 'none';
      eyeClosed.style.display = 'block';
    } else {
      eyeOpen.style.display = 'block';
      eyeClosed.style.display = 'none';
    }
  });

  /* ==========================================
     Input Validation
     ========================================== */
  function validateEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function showError(input, errorEl, message) {
    input.classList.add('input-error');
    errorEl.textContent = message;
    errorEl.classList.add('visible');
  }

  function clearError(input, errorEl) {
    input.classList.remove('input-error');
    errorEl.textContent = '';
    errorEl.classList.remove('visible');
  }

  emailInput.addEventListener('blur', function () {
    var value = emailInput.value.trim();
    if (value === '') {
      clearError(emailInput, emailError);
    } else if (!validateEmail(value)) {
      showError(emailInput, emailError, 'Please enter a valid email address');
    } else {
      clearError(emailInput, emailError);
    }
  });

  emailInput.addEventListener('input', function () {
    if (emailInput.classList.contains('input-error')) {
      clearError(emailInput, emailError);
    }
  });

  passwordInput.addEventListener('blur', function () {
    var value = passwordInput.value;
    if (value === '') {
      showError(passwordInput, passwordError, 'Password is required');
    } else if (value.length < 6) {
      showError(passwordInput, passwordError, 'Password must be at least 6 characters');
    } else {
      clearError(passwordInput, passwordError);
    }
  });

  passwordInput.addEventListener('input', function () {
    if (passwordInput.classList.contains('input-error')) {
      clearError(passwordInput, passwordError);
    }
  });

  /* ==========================================
     Form Submission
     ========================================== */
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    var email = emailInput.value.trim();
    var password = passwordInput.value;
    var hasError = false;

    /* Validate email */
    if (email === '') {
      showError(emailInput, emailError, 'Email is required');
      hasError = true;
    } else if (!validateEmail(email)) {
      showError(emailInput, emailError, 'Please enter a valid email address');
      hasError = true;
    } else {
      clearError(emailInput, emailError);
    }

    /* Validate password */
    if (password === '') {
      showError(passwordInput, passwordError, 'Password is required');
      hasError = true;
    } else if (password.length < 6) {
      showError(passwordInput, passwordError, 'Password must be at least 6 characters');
      hasError = true;
    } else {
      clearError(passwordInput, passwordError);
    }

    if (hasError) {
      return;
    }

    /* Show loading state */
    setLoading(true);

    /* Simulate API call */
    setTimeout(function () {
      setLoading(false);

      /* Show success toast */
      showToast('success', 'Welcome back! Signing you in...');

      /* Handle Remember Me (UI only) */
      if (rememberMe.checked) {
        console.log('Remember me: enabled for ' + email);
      }
    }, 2000);
  });

  function setLoading(loading) {
    if (loading) {
      signInBtn.classList.add('loading');
      signInBtn.disabled = true;
    } else {
      signInBtn.classList.remove('loading');
      signInBtn.disabled = false;
    }
  }

  /* ==========================================
     Button Ripple Effect
     ========================================== */
  signInBtn.addEventListener('click', function (e) {
    if (signInBtn.classList.contains('loading')) {
      return;
    }

    var ripple = document.createElement('span');
    ripple.classList.add('btn-ripple');

    var rect = signInBtn.getBoundingClientRect();
    var size = Math.max(rect.width, rect.height);
    var x = e.clientX - rect.left - size / 2;
    var y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';

    signInBtn.appendChild(ripple);

    ripple.addEventListener('animationend', function () {
      ripple.remove();
    });
  });

  /* ==========================================
     Social Button Handlers (UI only)
     ========================================== */
  var socialButtons = document.querySelectorAll('.btn-social');
  socialButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var provider = btn.getAttribute('data-provider');
      showToast('info', 'Connecting to ' + provider + '...');
    });
  });

  /* ==========================================
     Forgot Password (UI only)
     ========================================== */
  forgotLink.addEventListener('click', function (e) {
    e.preventDefault();
    showToast('info', 'Password reset link will be sent to your email');
  });

  /* ==========================================
     Footer Link (UI only)
     ========================================== */
  var footerLink = document.querySelector('.footer-link');
  if (footerLink) {
    footerLink.addEventListener('click', function (e) {
      e.preventDefault();
      showToast('info', 'Account registration coming soon');
    });
  }

  /* ==========================================
     Toast Notification System
     ========================================== */
  function showToast(type, message) {
    var toast = document.createElement('div');
    toast.classList.add('toast', 'toast-' + type);

    var iconSvg = '';
    if (type === 'success') {
      iconSvg = '<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="#22C55E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>';
    } else if (type === 'error') {
      iconSvg = '<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="#EF4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>';
    } else {
      iconSvg = '<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="#16A34A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>';
    }

    toast.innerHTML = iconSvg + '<span class="toast-message">' + message + '</span><button class="toast-close" aria-label="Close notification"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>';

    toastContainer.appendChild(toast);

    var closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', function () {
      removeToast(toast);
    });

    setTimeout(function () {
      removeToast(toast);
    }, 4000);
  }

  function removeToast(toast) {
    toast.style.animation = 'toastSlideOut 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards';
    setTimeout(function () {
      if (toast.parentNode) {
        toast.remove();
      }
    }, 300);
  }

  /* ==========================================
     Cursor Glow Effect
     ========================================== */
  document.addEventListener('mousemove', function (e) {
    var x = e.clientX;
    var y = e.clientY;
    cursorGlow.style.left = x + 'px';
    cursorGlow.style.top = y + 'px';
  });

  /* ==========================================
     Background Particles (Canvas)
     ========================================== */
  var particles = [];
  var particleCount = 60;
  var animFrameId;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createParticle() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.max(0.5, Math.random() * 2),
      opacity: Math.random() * 0.4 + 0.1,
      color: Math.random() > 0.5 ? '22, 163, 74' : '34, 197, 94'
    };
  }

  function initParticles() {
    particles = [];
    for (var i = 0; i < particleCount; i++) {
      particles.push(createParticle());
    }
  }

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(' + p.color + ', ' + p.opacity + ')';
      ctx.fill();

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;
    }

    /* Draw connections */
    for (var i = 0; i < particles.length; i++) {
      for (var j = i + 1; j < particles.length; j++) {
        var dx = particles[i].x - particles[j].x;
        var dy = particles[i].y - particles[j].y;
        var dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 150) {
          var alpha = (1 - dist / 150) * 0.08;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = 'rgba(22, 163, 74, ' + alpha + ')';
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    animFrameId = requestAnimationFrame(drawParticles);
  }

  /* Respect reduced motion preference */
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function initParticlesSafe() {
    if (prefersReducedMotion.matches) {
      return;
    }
    resizeCanvas();
    initParticles();
    drawParticles();
  }

  window.addEventListener('resize', function () {
    resizeCanvas();
    /* Reinitialize particles on resize */
    for (var i = 0; i < particles.length; i++) {
      if (particles[i].x > canvas.width) particles[i].x = Math.random() * canvas.width;
      if (particles[i].y > canvas.height) particles[i].y = Math.random() * canvas.height;
    }
  });

  /* Start particles */
  initParticlesSafe();

  /* ==========================================
     Smooth Focus Transitions
     ========================================== */
  var inputs = document.querySelectorAll('.form-input');
  inputs.forEach(function (input) {
    input.addEventListener('focus', function () {
      input.parentElement.style.transform = 'scale(1.005)';
    });

    input.addEventListener('blur', function () {
      input.parentElement.style.transform = 'scale(1)';
    });
  });

  /* ==========================================
     Remember Me (UI only - persists in memory)
     ========================================== */
  rememberMe.addEventListener('change', function () {
    if (rememberMe.checked) {
      showToast('info', 'Session will be remembered on this device');
    }
  });

})();