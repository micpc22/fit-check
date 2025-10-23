document.addEventListener('DOMContentLoaded', function () {

  // =====================================
  // NAVIGATION MENU TOGGLE
  // =====================================
  document.querySelectorAll('.menu-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const nav = btn.parentElement.querySelector('.main-nav');
      if (nav) nav.classList.toggle('show');
    });
  });

  // =====================================
  // FOOTER YEAR AUTO UPDATE
  // =====================================
  ['year', 'year2', 'year3', 'year4'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = new Date().getFullYear();
  });

  // =====================================
  // CONTACT FORM VALIDATION
  // =====================================
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      const msgEl = document.getElementById('formMsg');
      msgEl.style.color = 'red';

      if (!name || !email || !message) {
        msgEl.textContent = 'Please fill out all fields.';
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        msgEl.textContent = 'Please enter a valid email.';
        return;
      }

      msgEl.style.color = 'green';
      msgEl.textContent = '✅ Message sent! (Demo only)';
      contactForm.reset();
    });
  }

  // =====================================
  // REGISTER FORM VALIDATION
  // =====================================
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    const error = document.getElementById('formError');

    registerForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = registerForm.fullname.value.trim();
      const email = registerForm.email.value.trim();
      const pass = registerForm.password.value;
      const confirm = registerForm.confirmPassword.value;

      if (!name || !email || !pass || !confirm) {
        error.textContent = "All fields are required.";
        return;
      }
      if (pass !== confirm) {
        error.textContent = "Passwords do not match.";
        return;
      }

      error.style.color = "green";
      error.textContent = "✅ Account created! Redirecting...";
      setTimeout(() => (window.location.href = "login.html"), 1500);
    });
  }

  // =====================================
  // LOGIN FUNCTION
  // =====================================
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();
      const msg = document.getElementById('loginMsg');
      msg.style.color = 'red';

      if (!email || !password) {
        msg.textContent = 'Please fill in both fields.';
        return;
      }

      msg.style.color = 'green';
      msg.textContent = '✅ Login successful! Redirecting...';
      setTimeout(() => {
        window.location.href = "onboarding.html";
      }, 1000);
    });
  }

  // =====================================
  // ONBOARDING MULTI-STEP FORM
  // =====================================
  let currentStep = 1;
  const userData = { goal: "", level: "", workout: "", days: [], time: "" };

  function showStep(step) {
    document.querySelectorAll(".step").forEach(s => s.classList.remove("active"));
    const el = document.getElementById(`step${step}`);
    if (el) el.classList.add("active");
  }

  window.nextStep = function () {
    if (currentStep < 6) currentStep++;
    if (currentStep === 6) showSummary();
    showStep(currentStep);
  };

  window.prevStep = function () {
    if (currentStep > 1) currentStep--;
    showStep(currentStep);
  };

  window.selectOption = function (el, field) {
    document.querySelectorAll(`[onclick*="${field}"]`).forEach(opt => opt.classList.remove("selected"));
    el.classList.add("selected");
    userData[field] = el.textContent;
  };

  window.toggleDay = function (el) {
    const day = el.textContent;
    el.classList.toggle("selected");
    if (userData.days.includes(day)) {
      userData.days = userData.days.filter(d => d !== day);
    } else {
      userData.days.push(day);
    }
  };

  function showSummary() {
    const timeInput = document.getElementById("time");
    userData.time = timeInput ? timeInput.value : "";

    const summaryEl = document.getElementById("summary");
    if (summaryEl) {
      summaryEl.innerHTML = `
        <p><strong>Goal:</strong> ${userData.goal}</p>
        <p><strong>Level:</strong> ${userData.level}</p>
        <p><strong>Workout:</strong> ${userData.workout}</p>
        <p><strong>Days:</strong> ${userData.days.join(", ") || "None"}</p>
        <p><strong>Time:</strong> ${userData.time || "Not set"}</p>
      `;
    }
  }

  // Save to localStorage & redirect
  window.finish = function () {
    localStorage.setItem("fitUser", JSON.stringify(userData));
    alert("🎉 Welcome to FitLife! Your personalized plan has been saved.");
    window.location.href = "index.html";
  };

  // =====================================
  // SHOW RECOMMENDATION ON HOMEPAGE
  // =====================================
  const userBox = localStorage.getItem("fitUser");
  if (userBox && document.querySelector(".hero")) {
    const data = JSON.parse(userBox);
    const box = document.createElement("div");
    box.className = "recommendation-box";

    box.innerHTML = `
      <h3>🏋️ Personalized Recommendation</h3>
      <p><strong>Goal:</strong> ${data.goal || "Not set"}</p>
      <p><strong>Level:</strong> ${data.level || "Beginner"}</p>
      <p><strong>Preferred Workout:</strong> ${data.workout || "General Fitness"}</p>
      <p><strong>Days:</strong> ${data.days.length ? data.days.join(", ") : "Flexible"}</p>
      <p><strong>Time:</strong> ${data.time || "Anytime"}</p>
      <a href="classes.html" class="btn primary mt-2">View Recommended Classes</a>
    `;

    const hero = document.querySelector(".hero-text");
    hero.prepend(box);
  }

});
