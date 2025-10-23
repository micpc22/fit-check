// Client-side validation for register form
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('registerForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const fullname = document.getElementById('fullname').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const password = document.getElementById('password').value;
    const confirm = document.getElementById('confirmPassword').value;
    const errEl = document.getElementById('formError');
    errEl.textContent = '';

    if (!fullname) { errEl.textContent = 'Full name is required.'; return; }
    if (!email) { errEl.textContent = 'Email is required.'; return; }
    // simple email pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) { errEl.textContent = 'Please enter a valid email address.'; return; }
    if (!password) { errEl.textContent = 'Please choose a password.'; return; }
    if (password.length < 6) { errEl.textContent = 'Password must be at least 6 characters.'; return; }
    if (password !== confirm) { errEl.textContent = 'Passwords do not match.'; return; }

    // Optional phone sanity check (very lenient)
    if (phone && phone.replace(/\D/g, '').length < 7) { errEl.textContent = 'Please enter a valid phone number or leave blank.'; return; }

    // Simulate a successful registration (replace with real fetch to server)
    errEl.style.color = 'green';
    errEl.textContent = 'Account created — this demo does not send data to a server.';
    form.reset();
  });
});
