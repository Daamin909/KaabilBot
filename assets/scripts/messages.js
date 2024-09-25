userInput.disabled = true;
loading_screen.style.display = 'flex';
var messagesCheck;
checkFilePaths();

function checkFilePaths(){
    fetch('http://127.0.0.1:5000/check', {
        method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
        if (!data){
            createFile();
        }
        else{
            getValue();
        }
    })
    .catch((error) => {
        showErrorMessage('Error 504. Please try again later.');
    });
}
function createFile(){
    fetch('http://127.0.0.1:5000/createFile', {
        method: 'POST',
    })
    .then(response => response.json())
    .then(data => {
        if (!data){
            showErrorMessage('Error 504. Please try again later.');
        }
        else{
            getValue();
        }
    })
    .catch((error) => {
        showErrorMessage('Error 504. Please try again later.');
    });
}
function getValue(){
    fetch('http://127.0.0.1:5000/read', {
        method: 'POST',
    })
    .then(response => response .json())
    .then(data => {
        if (!data) {
            showErrorMessage('Error 504. Please try again later.');
        } 
        else {
            console.log(data);
            chatHistory = data;
            numberOfMessages = chatHistory.length;
        }
        loadOldMessages();
    })
    .catch((error) => {
        console.error('Error:', error);
        showErrorMessage('Error 504. Please try again later.');
    });
}
function checkEmpty(){
    if (Array.isArray(chatHistory) && chatHistory.length === 0){
        return true;
    }
    else{
        return false;
    }
}
function loadOldMessages(){
    if(checkEmpty()){
        const intro = `<h3> Welcome to KaabilBot™! </h3>
               <strong>KaabilBot</strong> is here to assist you with any query or task you have. True to its name, this bot is designed to handle a wide range of requests efficiently.`;
        addIntroMessage(intro);
        loading_screen.style.display = 'none';
        userInput.disabled = false;
    }
    else{
        loadMsgs();
    }
    enableReadAloud();
}
function loadMsgs(){
    chatHistory.forEach(message => {
        if (message.id === undefined || message.id === null || message.bot === undefined || message.bot === null || message.content === undefined || message.content === null || message.user === undefined || message.user === null )   {
            return;
        }
        if (message.bot === true){
            addOldMessages(message.content);
        }
        else if (message.bot === false){
            addOldMessages(message.content, true);
        }
    });
    checkIncomplete();
    loading_screen.style.display = 'none';
    userInput.disabled = false;
}
function checkIncomplete(){
    const messages = document.getElementsByClassName('message');
    const lastMessage = messages[messages.length - 1];
    if (lastMessage.classList.contains('user-message')) {
        get_response(lastMessage.textContent);
    } 
}
function enableReadAloud(){
    document.querySelectorAll('.read-aloud-btn').forEach(button => {
        button.addEventListener('click', function() {
            window.speechSynthesis.cancel();
            const messageId = this.getAttribute('data-message-id');
            const messageContent = document.querySelector(`.message[data-message-id="${messageId}"]`).textContent;
            const speech = new SpeechSynthesisUtterance(messageContent);
            speech.volume = 100;
            speech.rate = 1;
            speech.pitch = 1;
            window.speechSynthesis.speak(speech);
        });
    });
}