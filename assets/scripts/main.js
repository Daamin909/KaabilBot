const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const micButton = document.getElementById('mic-button');

function addMessage(content, userCheck = false) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(userCheck ? 'user-message' : 'bot-message');
    const contentDiv = document.createElement('div');
    contentDiv.classList.add('message-content');
    if (content.length > 500) {
        contentDiv.textContent = content.slice(0, 500) + '...';
        const readMore = document.createElement('span');
        readMore.classList.add('read-more');
        readMore.textContent = 'Read more';
        readMore.addEventListener('click', () => {
            contentDiv.textContent = content;
            readMore.style.display = 'none';
        });
        messageDiv.appendChild(contentDiv);
        messageDiv.appendChild(readMore);
    } else {
        contentDiv.textContent = content;
        messageDiv.appendChild(contentDiv);
    }
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
    alert('Microphone functionality not implemented yet.');
});

addMessage('Sir Hammad is the greatest of all time!');


function get_response(message) {
    fetch('http://127.0.0.1:5000/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: message })
    })
    .then(response => response.json())
    .then(data => {
        addMessage(data.response);
    })
    .catch(error => console.error('Error:', error));
}