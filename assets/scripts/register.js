const loading_screen = document.getElementById('loading-screen');
document.addEventListener('DOMContentLoaded', function() {
    loading_screen.style.display = 'none';
});
function showErrorMessage(message, size=false) {
    if (document.querySelector('.error-message')) {
        for (let i = 0; i < document.querySelectorAll('.error-message').length; i++) {
            document.querySelectorAll('.error-message')[i].remove();
        }
    }
    const messageBox = document.createElement("div");
    messageBox.classList.add("error-message");
    messageBox.textContent = message;
    messageBox.style.position = "fixed";
    messageBox.style.bottom = "20px";
    messageBox.style.left = "50%";
    messageBox.style.transform = "translateX(-50%)";
    messageBox.style.backgroundColor = "#f44336";
    messageBox.style.color = "white";
    messageBox.style.padding = "10px 20px";
    messageBox.style.borderRadius = "5px";
    messageBox.style.zIndex = "100000000000000000000000000000000000";
    messageBox.style.fontSize = size ? "20px" : "12px";
    document.body.appendChild(messageBox);
    const completed = new Audio('assets/sound-effects/error-message.mp3'); 
    completed.play();
    setTimeout(() => {
        messageBox.remove();
    }, 3000);
}
function toggleForm() {
    const card = document.querySelector('.card');
    card.classList.toggle('flipped');
}
document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const pass = checkPassword(password);
    const mail = checkEmail(email);
    if(pass[0] && mail){
        signUp(email, password);
    }
    else if (!pass[0] && !mail) {
        showErrorMessage('Invalid email and password');
    }
    else if(!mail){
        showErrorMessage('Invalid email');
    }
    else if(!pass[0]){
        pass[1] ? (pass[2] ? (pass[3] ? (pass[4] ? null: showErrorMessage('Password must contain atleast 1 special character')) : showErrorMessage('Password must contain atleast 1 number')) : showErrorMessage('Password must contain atleast 1 uppercase letter')) : showErrorMessage('Password must contain atleast 8 characters'); 
    }
    else{
        console.log(pass, mail);    
    }
});
document.getElementById('signin-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('signin-email').value;
    const password = document.getElementById('signin-password').value;
    const pass = checkPassword(password);
    const mail = checkEmail(email);
    if(pass[0] && mail){
        console.log('Sign In:', { email, password });
    }
    else if (!pass[0] && !mail) {
        showErrorMessage('Invalid email and password');
    }
    else if(!mail){
        showErrorMessage('Invalid email');
    }
    else if(!pass[0]){
        pass[1] ? (pass[2] ? (pass[3] ? (pass[4] ? null: showErrorMessage('Password must contain atleast 1 special character')) : showErrorMessage('Password must contain atleast 1 number')) : showErrorMessage('Password must contain atleast 1 uppercase letter')) : showErrorMessage('Password must contain atleast 8 characters'); 
    }
});

var showingOTP = false;
var credentials = [];

const emailInput = document.getElementById('signup-email');
const emailLabel = document.querySelector('label[for="signup-email"]');
const emailInput2 = document.getElementById('signin-email');
const emailLabel2 = document.querySelector('label[for="signin-email"]');
emailInput.addEventListener('input', function() {
    const emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    valid = emailTest.test(emailInput.value);
    if (!valid) {
        emailLabel.style.top = '-20px'; 
        emailLabel.style.fontSize = '12px'; 
        emailInput.style.color = '#ff0000';
    } else if (valid) {
        emailLabel.style.top = '-20px'; 
        emailLabel.style.fontSize = '12px';
        emailLabel.style.color = '#23a6d5'; 
        emailInput.style.color = '#000';
    }
});
emailInput2.addEventListener('input', function() {
    const emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    valid = emailTest.test(emailInput2.value);
    if (!valid) {
        emailLabel2.style.top = '-20px'; 
        emailLabel2.style.fontSize = '12px'; 
        emailInput2.style.color = '#ff0000';
    } else if (valid) {
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



document.getElementById('visible-signup').addEventListener('click', function() {
    const passwordInput = document.getElementById('signup-password');
    const passwordIcon = document.getElementById('visible-signup');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        passwordIcon.className = 'fas fa-eye-slash';
    } else {
        passwordInput.type = 'password';
        passwordIcon.className = 'fas fa-eye';
    }
});
document.getElementById('visible-signin').addEventListener('click', function() {
    const passwordInput = document.getElementById('signin-password');
    const passwordIcon = document.getElementById('visible-signin');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        passwordIcon.className = 'fas fa-eye-slash';
    } else {
        passwordInput.type = 'password';
        passwordIcon.className = 'fas fa-eye';
    }
});


function checkEmail(email) {
    const emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailTest.test(email);
}
function checkPassword(password) {
    const length = /.{8,}/.test(password);
    const uppercase = /[A-Z]/.test(password);
    const number = /\d/.test(password);
    const specialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const passwordTest = length && uppercase && number && specialCharacter;
    return [passwordTest, length, uppercase, number, specialCharacter];
}

function signUp(email, password) {
    credentials = [];
    const submitBtn = document.getElementById('signup-submit');
    submitBtn.disabled = true;
    fetch('http://127.0.0.1:5000/check-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
    })
    .then(response => response.json())
    .then(data => {
        submitBtn.disabled = false;
        data ? null: () => {
            showErrorMessage('Email already exists');
            return;
        };
    })
    .then(() => {
        loading_screen.style.display = 'flex';
        fetch('http://127.0.0.1:5000/otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(email, password)
        })
        .then(response => response.json())
        .then(data => {
            loading_screen.style.display = 'none';
            console.log(data);
            if (data) {
                OpenUIforOTP();
                credentials = [email, password];
            }
            else {
                showErrorMessage('An error occurred', true);
            }
            /*data ? () => {
                OpenUIforOTP();
                credentials = [email, password];
            }: showErrorMessage('An error occurred', true);*/
        })
        .catch(error => {
            loading_screen.style.display = 'none';
            console.error('Error:', error);
            showErrorMessage('An error occurred, 2', true);
            return;
        });
    })
    .catch((error) => {
        submitBtn.disabled = false;
        showErrorMessage('An error occurred');
        return;
    });

}
function OpenUIforOTP() {
    showingOTP = true;  
    console.log("hello");
    document.getElementById('otpDialogOverlay').style.display = 'flex';
    const proceedBtn = document.getElementById('otpProceedBtn');
    const otpInput = document.getElementById('otpInputField');
    proceedBtn.addEventListener('click', () => {
        const otp = otpInput.value;
        if (otp.length === 6) {
            console.log('to be continued');
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && showingOTP) {
            closeUIforOTP();
        }
    });
}
function closeUIforOTP() {
    document.getElementById('otpDialogOverlay').style.display = 'none';
    showingOTP = false;
}

document.getElementById('otp-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const otp = document.getElementById('otpInputField').value; 
    if (otp.length != 6) {
        showErrorMessage('Enter a 6 digit OTP');
    }
});
document.getElementById('otpInputField').addEventListener('input', function(event) {
    this.value = this.value.replace(/[^0-9]/g, '')
});
    
