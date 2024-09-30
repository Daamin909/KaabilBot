const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const micButton = document.getElementById('mic-button');
const stopIcon = document.getElementById('stop-icon');
const startIcon = document.getElementById('start-icon');
const loading_screen = document.getElementById('loading-screen');
stopIcon.style.display = 'none';

var chatHistory = [];
var numberOfMessages = 0;
var mediaRecorder;
var audioChunks = [];
var recording = false;
document.addEventListener('DOMContentLoaded', () => {   
    window.speechSynthesis.cancel();
});
function writeToMessages(format){
    chatHistory.push(format);
    numberOfMessages=chatHistory.length;
    fetch('http://127.0.0.1:5000/write', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(format)
    })
    .then(response => response.json())
    .then(data => {
        if (!data){
            showErrorMessage('Error 504. Please try again later.');
        }
    })
    .catch((error) => {
        showErrorMessage('Error 504. Please try again later.');
    });
}
function addMessage(content, userCheck = false) {
    const format = {
        "id": numberOfMessages+1,
        "user": userCheck,
        "bot": !userCheck,
        "content": content,
    }
    writeToMessages(format);
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(userCheck ? 'user-message' : 'bot-message');
    const contentDiv = document.createElement('div');
    contentDiv.classList.add('message-content');
    contentDiv.innerHTML = content;
    messageDiv.appendChild(contentDiv);
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    const readAloudButton = document.createElement('button');
    readAloudButton.classList.add('read-aloud-btn');
    readAloudButton.innerHTML = '<i class="fas fa-volume-up"></i>';
    contentDiv.appendChild(readAloudButton);
    const messages = document.querySelectorAll('.message');
    messages.forEach((message, index) => {
        const messageId = index + 1; 
        message.setAttribute('data-message-id', messageId);
        const button = message.querySelector('.read-aloud-btn');
        button.setAttribute('data-message-id', messageId);
    });
}
function addIntroMessage(content) {
    const format = {
        "id": 1,
        "user": false,
        "bot": true,
        "special": true,
        "content": content,
    }
    writeToMessages(format);
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add('bot-message');
    const contentDiv = document.createElement('div');
    contentDiv.classList.add('message-content');
    contentDiv.innerHTML = content;
    messageDiv.appendChild(contentDiv);
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    const readAloudButton = document.createElement('button');
    readAloudButton.classList.add('read-aloud-btn');
    readAloudButton.innerHTML = '<i class="fas fa-volume-up"></i>';
    contentDiv.appendChild(readAloudButton);
    const messages = document.querySelectorAll('.message');
    messages.forEach((message, index) => {
        const messageId = index + 1; 
        message.setAttribute('data-message-id', messageId);
        const button = message.querySelector('.read-aloud-btn');
        button.setAttribute('data-message-id', messageId);
    });
}
function addOldMessages(content, userCheck = false) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(userCheck ? 'user-message' : 'bot-message');
    const contentDiv = document.createElement('div');
    contentDiv.classList.add('message-content');
    contentDiv.innerHTML = content;
    messageDiv.appendChild(contentDiv);
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    const readAloudButton = document.createElement('button');
    readAloudButton.classList.add('read-aloud-btn');
    readAloudButton.innerHTML = '<i class="fas fa-volume-up"></i>';
    contentDiv.appendChild(readAloudButton);
    const messages = document.querySelectorAll('.message');
    messages.forEach((message, index) => {
        const messageId = index + 1; 
        message.setAttribute('data-message-id', messageId);
        const button = message.querySelector('.read-aloud-btn');
        button.setAttribute('data-message-id', messageId);
    });
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
function get_response(message) {
    userInput.disabled = true;
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
        loading_screen.style.display = 'none';
        userInput.disabled = false;
    }, 3000);
}

micButton.addEventListener('click', () => {
    if (recording) {
        stopRecording();
    } else {
        startRecording();
    }
});

function checkPerms() {
    navigator.permissions.query({ name: 'microphone' })
    .then(permissionStatus => {
        if (permissionStatus.state === 'granted') {
            startRecording();
        } else if (permissionStatus.state === 'prompt') {
            navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                stream.getTracks().forEach(track => track.stop()); 
                startRecording();
            })
            .catch(error => {
                showErrorMessage('Microphone access is denied.');
            });
        } else {
            showErrorMessage('Microphone access is denied.');
        }
    })
    .catch(() => {
        showErrorMessage('Error 404. Please try again later.');
        navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            stream.getTracks().forEach(track => track.stop());
            startRecording();
        })
        .catch(error => {
            showErrorMessage('Error accessing the microphone. Please check permissions.');
        });
    });
}

function startRecording() {
    navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.ondataavailable = (event) => {
            audioChunks.push(event.data);
        };
        mediaRecorder.onstop = () => {
            loading_screen.style.display = 'flex';
            userInput.disabled = true;
            const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
            const formData = new FormData();
            formData.append('audio', audioBlob, 'recording.webm');
            fetch('http://127.0.0.1:5000/speech', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (!data) {
                    showErrorMessage('Error 404. Please try again later.');
                    loading_screen.style.display = 'none';
                    userInput.disabled = false;
                    return;
                }
                const unformatted_content = data.response;
                const formatted_content = `${unformatted_content}`;
                const userMessage = data.requestPrompt;
                addMessage(userMessage, true);
                addMessage(formatted_content);
                loading_screen.style.display = 'none';
                userInput.disabled = false;
            })
            .catch(error => {
                showErrorMessage('Error 404. Please try again later.');
                userInput.disabled = false;
                loading_screen.style.display = 'none';
            });
            audioChunks = []; 
        };
        mediaRecorder.start();
        recording = true;
        stopIcon.style.display = 'block';
        startIcon.style.display = 'none';
    })
    .catch(error => {
        showErrorMessage('Microphone access is denied.');
    });
}

function stopRecording() {
    recording = false;
    mediaRecorder.stop();
    stopIcon.style.display = 'none';
    startIcon.style.display = 'block';
}