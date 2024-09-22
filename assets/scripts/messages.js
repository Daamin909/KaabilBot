checkFilePaths();
function checkFilePaths(){
    fetch('http://127.0.0.1:5000/check', {
        method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
        if (!data.messages){
            createFile('messages');
        }
        else{
            getValue();
        }
        if (!data.audio){
            createFile('audio');
        }
        if (!data.number){
            createFile('number')
        }
        else{
            getNumber();
        }
    })
    .catch((error) => {
        showErrorMessage('Error 504. Please try again later.');
        console.log(error);
    });
}
function createFile(type){
    fetch('http://127.0.0.1:5000/createFiles', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'file': type })
    })
    .then(response => response.json())
    .then(data => {
        if (!data.bool){
            console.log('Error creating file.');
            showErrorMessage('Error 504. Please try again later.');
        }
        else{
            if (type == 'messages'){
                getValue();
            }
            else if (type == 'number'){
                getNumber();
            }
        }
    })
    .catch((error) => {
        showErrorMessage('Error 504. Please try again later.');
        console.log(error);
    });
}
function getValue(){
    fetch('http://127.0.0.1:5000/read', {
        method: 'POST',
    })
    .then(response => response.json())
    .then(data => {
        if (data.json==false){
            showErrorMessage('Error 504. Please try again later.');
        }
        else {
            chatHistory = JSON.parse(data.json);
            if (chatHistory.empty === true){
                chatHistory = [];
            }
        }
    })
    .catch((error) => {
        showErrorMessage('Error 504. Please try again later.');
        console.log(error);
    });
}
function getNumber(){
    fetch('http://127.0.0.1:5000/rean', {
        method: 'POST',
    })
    .then(response => response.json())
    .then(data => {
        if (data.json==false){
            showErrorMessage('Error 504. Please try again later.');
        }
        else{
            numberOfMessages = JSON.parse(data.json).number_of_messages;
            loadOldMessages();
        }
    })
    .catch((error) => {
        showErrorMessage('Error 504. Please try again later.');
        console.log(error);
    });
}
function checkEmpty(){
    if (chatHistory.length === 0){
        return true;
    }
    else if (chatHistory.length === 1){
        const firstMessage = (chatHistory[0].empty);
        if (firstMessage === true){
            return true;
        }
    }
    else{
        return false;
    }
}
function loadOldMessages(){
    if(checkEmpty()){
        const intro = `<h3> Welcome to KaabilBot™! </h3>
               <strong>KaabilBot</strong> is here to assist you with any query or task you have. True to its name, this bot is designed to handle a wide range of requests efficiently.`;
        addMessage(intro);
    }
    else{
        chatHistory.forEach(message => {
            if (message.id === undefined || message.id === null || message.bot === undefined || message.bot === null || message.content === undefined || message.content === null || message.user === undefined || message.user === null || message.time === undefined || message.time === null)   {
                console.log('Error loading messages.');
                return;
            }
            if (message.bot === true){
                addOldMessages(message.content);
            }
            else if (message.bot === false){
                addOldMessages(message.content, true);
            }
        });
        writeToNumber();
    }
}
window.addEventListener('beforeunload', function(event) {
    if (numberOfMessages % 2 === 0){
        numberOfMessages--;
        chatHistory.pop();
        writeToNumber();
        removeLatestMsg();
        changeMessages();
    }
});