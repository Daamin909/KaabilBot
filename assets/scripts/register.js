function toggleForm() {
    const card = document.querySelector('.card');
    card.classList.toggle('flipped');
}

document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;
    console.log('Sign Up:', { username, password });
    alert('Sign up successful!');
});

document.getElementById('signin-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('signin-username').value;
    const password = document.getElementById('signin-password').value;
    console.log('Sign In:', { username, password });
    alert('Sign in successful!');
});

document.querySelectorAll('input').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentNode.style.transform = 'scale(1.05)';
    });

    input.addEventListener('blur', function() {
        this.parentNode.style.transform = 'scale(1)';
    });
});
const emailInput = document.getElementById('signup-email');
const emailLabel = document.querySelector('label[for="signup-email"]');
const emailInput2 = document.getElementById('signin-email');
const emailLabel2 = document.querySelector('label[for="signin-email"]');
emailInput.addEventListener('input', function() {
    if (!emailInput.validity.valid) {
        emailLabel.style.top = '-20px'; 
        emailLabel.style.fontSize = '12px'; 
        emailInput.style.color = '#ff0000';
    } else {
        emailLabel.style.top = '-20px'; 
        emailLabel.style.fontSize = '12px';
        emailLabel.style.color = '#23a6d5'; 
        emailInput.style.color = '#000';
    }
});
emailInput2.addEventListener('input', function() {
    if (!emailInput2.validity.valid) {
        emailLabel2.style.top = '-20px'; 
        emailLabel2.style.fontSize = '12px'; 
        emailInput2.style.color = '#ff0000';
    } else {
        emailLabel2.style.top = '-20px'; 
        emailLabel2.style.fontSize = '12px';
        emailLabel2.style.color = '#23a6d5'; 
        emailInput2.style.color = '#000';

    }
});
emailInput.addEventListener('blur', () => {
    emailLabel.style.color = '#777';
});
emailInput.addEventListener('focus', () => {
    emailLabel.style.color = '#23a6d5';
});
emailInput2.addEventListener('blur', () => {
    emailLabel2.style.color = '#777';
});
emailInput2.addEventListener('focus', () => {
    emailLabel2.style.color = '#23a6d5';
});
const passwordInput = document.getElementById('signup-password');
const passwordLabel = document.querySelector('label[for="signup-password"]');
const passwordInput2 = document.getElementById('signin-password');
const passwordLabel2 = document.querySelector('label[for="signin-password"]');
passwordInput.addEventListener('blur', () => {
    passwordLabel.style.color = '#777';
});
passwordInput.addEventListener('focus', () => {
    passwordLabel.style.color = '#23a6d5';
});
passwordInput2.addEventListener('blur',  () => {
    passwordLabel2.style.color = '#777';
});
passwordInput2.addEventListener('focus', () => {
    passwordLabel2.style.color = '#23a6d5';
});