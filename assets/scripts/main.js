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
function writeToMessages(format){
    chatHistory.push(format);
    fetch('http://127.0.0.1:5000/write', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(chatHistory)
    })
    .then(response => response.json())
    .then(data => {
        if (!data.bool){
            showErrorMessage('Error 504. Please try again later.');
        }
    })
    .catch((error) => {
        showErrorMessage('Error 504. Please try again later.');
    });
}
function changeMessages(){
    fetch('http://127.0.0.1:5000/write', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(chatHistory)
    })
    .then(response => response.json())
    .then(data => {
        if (!data.bool){
            showErrorMessage('Error 504. Please try again later.');
        }
    })
    .catch((error) => {
        showErrorMessage('Error 504. Please try again later.');
    });
}
function writeToNumber(){
    fetch('http://127.0.0.1:5000/writn', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ number_of_messages: numberOfMessages })
    })
    .then(response => response.json())
    .then(data => {
        if (!data.bool){
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
        "time": new Date().toLocaleString()
    }
    numberOfMessages += 1;
    writeToMessages(format);
    writeToNumber();
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
function addIntroMessage(content) {
    const format = {
        "id": 1,
        "user": false,
        "bot": true,
        "special": true,
        "content": content,
        "time": new Date().toLocaleString()
    }
    numberOfMessages = 1;
    writeToMessages(format);
    writeToNumber();
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add('bot-message');
    const contentDiv = document.createElement('div');
    contentDiv.classList.add('message-content');
    contentDiv.innerHTML = content;
    messageDiv.appendChild(contentDiv);
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
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
    }, 3000);
}

let mediaRecorder;
let audioChunks = [];
let recording = false;

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
            convertToWav(audioBlob).then(wavBlob => {
                formData.append('audio', wavBlob, 'recording.wav');
                return fetch('http://127.0.0.1:5000/speech', {
                    method: 'POST',
                    body: formData
                });
            })
            .then(response => response.json())
            .then(data => {
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

function convertToWav(webmBlob) {
    return new Promise((resolve, reject) => {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const fileReader = new FileReader();
        fileReader.onload = function(event) {
            const audioData = event.target.result;
            audioContext.decodeAudioData(audioData).then(function(decodedData) {
                const wavBlob = audioBufferToWav(decodedData);
                resolve(wavBlob);
            }).catch(reject);
        };
        fileReader.readAsArrayBuffer(webmBlob);
    });
}
function stopRecording() {
    recording = false;
    mediaRecorder.stop();
    stopIcon.style.display = 'none';
    startIcon.style.display = 'block';
}
{
    function audioBufferToWav(buffer, opt) {
    opt = opt || {};
    var numChannels = buffer.numberOfChannels;
    var sampleRate = buffer.sampleRate;
    var format = opt.float32 ? 3 : 1;
    var bitDepth = format === 3 ? 32 : 16;
    var result;
    if (numChannels === 2) {
        result = interleave(buffer.getChannelData(0), buffer.getChannelData(1));
    } else {
        result = buffer.getChannelData(0);
    }
    return encodeWAV(result, format, sampleRate, numChannels, bitDepth);
}

function encodeWAV(samples, format, sampleRate, numChannels, bitDepth) {
    var bytesPerSample = bitDepth / 8;
    var blockAlign = numChannels * bytesPerSample;
    var buffer = new ArrayBuffer(44 + samples.length * bytesPerSample);
    var view = new DataView(buffer);
    writeString(view, 0, 'RIFF');
    view.setUint32(4, 36 + samples.length * bytesPerSample, true);
    writeString(view, 8, 'WAVE');
    writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, format, true);
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * blockAlign, true);
    view.setUint16(32, blockAlign, true);
    view.setUint16(34, bitDepth, true);
    writeString(view, 36, 'data');
    view.setUint32(40, samples.length * bytesPerSample, true);
    if (format === 1) { 
        floatTo16BitPCM(view, 44, samples);
    } else {
        writeFloat32(view, 44, samples);
    }
    return new Blob([buffer], { type: 'audio/wav' });
}

function interleave(inputL, inputR) {
    var length = inputL.length + inputR.length;
    var result = new Float32Array(length);
    var index = 0;
    var inputIndex = 0;
    while (index < length) {
        result[index++] = inputL[inputIndex];
        result[index++] = inputR[inputIndex];
        inputIndex++;
    }
    return result;
}

function writeFloat32(output, offset, input) {
    for (var i = 0; i < input.length; i++, offset += 4) {
        output.setFloat32(offset, input[i], true);
    }
}

function floatTo16BitPCM(output, offset, input) {
    for (var i = 0; i < input.length; i++, offset += 2) {
        var s = Math.max(-1, Math.min(1, input[i]));
        output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
    }
}

function writeString(view, offset, string) {
    for (var i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
    }
}
}