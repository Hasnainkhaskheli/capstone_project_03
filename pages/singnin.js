const signInForm = document.getElementById('signInForm');
const signInEmail = document.getElementById('signInEmail');
const signInPassword = document.getElementById('signInPassword');
const signInEmailError = document.getElementById('signInEmailError');
const signInPasswordError = document.getElementById('signInPasswordError');


signInForm.addEventListener('submit', async function(event) {
  event.preventDefault(); // Prevent default form submission

  let valid = true;

  // Reset error messages
  signInEmailError.textContent = '';
  signInPasswordError.textContent = '';

  // Email validation
  if (!validateEmail(signInEmail.value)) {
    signInEmailError.textContent = 'Please enter a valid email address';
    valid = false;
  }

  // Password validation
  if (signInPassword.value.length < 8) {
    signInPasswordError.textContent = 'Password must be at least 8 characters';
    valid = false;
  }

  if (valid) {
    try {
      const response = await fetch('https://fakestoreapi.com/users');
      const users = await response.json();

      // Simulating user sign-in by checking if the email and password match any existing user
      const user = users.find(u => u.email === signInEmail.value && u.password === signInPassword.value);

      if (user) {
        console.log('Sign-In Success:', user);
        alert('Sign-In Successful!');
      } else {
        alert('Invalid email or password');
      }
      
    } catch (error) {
      console.error('Sign-In Error:', error);
      alert('Error signing in, please try again.');
    }
  }
});

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

