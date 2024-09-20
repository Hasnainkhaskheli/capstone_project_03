const signUpForm = document.getElementById('signUpForm');
const signUpEmail = document.getElementById('signUpEmail');
const signUpPassword = document.getElementById('signUpPassword');
const acceptPolicy = document.getElementById('acceptPolicy');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const policyError = document.getElementById('policyError');

signUpForm.addEventListener('submit', async function(event) {
  event.preventDefault(); // Prevent default form submission

  let valid = true;

  // Reset error messages
  emailError.textContent = '';
  passwordError.textContent = '';
  policyError.textContent = '';

  // Email validation
  if (!validateEmail(signUpEmail.value)) {
    emailError.textContent = 'Please enter a valid email address';
    valid = false;
  }

  // Password validation
  if (signUpPassword.value.length < 8) {
    passwordError.textContent = 'Password must be at least 8 characters';
    valid = false;
  }

  // Accept policy validation
  if (!acceptPolicy.checked) {
    policyError.textContent = 'You must accept the privacy policy';
    valid = false;
  }

  if (valid) {
    try {
      const response = await fetch('https://fakestoreapi.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: signUpEmail.value,
          password: signUpPassword.value
        })
      });

      const data = await response.json();
      console.log('Sign-Up Success:', data);
      alert('Account created successfully!');

    } catch (error) {
      console.error('Sign-Up Error:', error);
      alert('Error creating account, please try again.');
    }
  }
});

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

