const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const micButton = document.getElementById('mic-button');
document.addEventListener('DOMContentLoaded', () => {
    const loading_screen = document.getElementById('loading-screen');
    loading_screen.style.display = 'none';
});
function addMessage(content, userCheck = false) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(userCheck ? 'user-message' : 'bot-message');
    const contentDiv = document.createElement('div');
    contentDiv.classList.add('message-content');
    contentDiv.innerHTML = content;
    messageDiv.appendChild(contentDiv);
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function sendMessage() {
    const message = userInput.value.trim();
    if (message) {
        addMessage(message, true);
        userInput.value = '';
        get_response(message);
    }
}

sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

micButton.addEventListener('click', () => {
    startRecording();
});
const intro = `<h3> Welcome to KaabilBot™! </h3>
               <strong>KaabilBot</strong> is here to assist you with any query or task you have. True to its name, this bot is designed to handle a wide range of requests efficiently.
                <h3>Made with ❤️ by <a href="https://github.com/Daamin909" target="_blank">Daamin Ashai</a></h3>
                <h3>Under the guidance of <a href="https://github.com/MHammad4968" target="_blank">Sir Hammad</a></h3>`;
addMessage(intro);


function get_response(message) {
    userInput.disabled = true;
    const loading_screen = document.getElementById('loading-screen');
    loading_screen.style.display = 'flex';
    fetch('http://127.0.0.1:5000/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: message })
    })
    .then(response => response.json())
    .then(data => {
        const unformmated_content=data.response;
        const formatted_content=`${unformmated_content}`;
        addMessage(formatted_content);
        loading_screen.style.display = 'none';
        userInput.disabled = false;
    })
    .catch(error => {
        showErrorMessage('Error 404. Please try again later.');
        removeLatestMsg();
        loading_screen.style.display = 'none';
        userInput.disabled = false;
    });
}

function removeLatestMsg() {
    const messages = document.getElementsByClassName('message');
    messages[messages.length - 1].remove();
}

function showErrorMessage(message) {
    const messageBox = document.createElement("div");
    messageBox.textContent = message;
    messageBox.style.position = "fixed";
    messageBox.style.bottom = "20px";
    messageBox.style.left = "50%";
    messageBox.style.transform = "translateX(-50%)";
    messageBox.style.backgroundColor = "#f44336";
    messageBox.style.color = "white";
    messageBox.style.padding = "10px 20px";
    messageBox.style.borderRadius = "5px";
    messageBox.style.zIndex = "10000000";
    messageBox.style.fontSize = "18px";
    document.body.appendChild(messageBox);
    const completed = new Audio('assets/sound-effects/error-message.mp3'); 
    completed.play();
    setTimeout(() => {
        messageBox.remove();
    }, 3000);
}