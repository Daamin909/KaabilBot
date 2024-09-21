checkFilePaths();
var chatHistory = [], numberOfMessages = [];
function checkFilePaths(){
    fetch('http://127.0.0.1:5000/check', {
        method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
        if (!data.messages){
            createFile('messages');
        }
        if (!data.audio){
            createFile('audio');
        }
        if (!data.number){
            createFile('number');
        }
        getValue();
        getNumber();
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
            showErrorMessage('Error 504. Please try again later.');
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
        else{
            chatHistory = chatHistory.concat(data.json);
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
            numberOfMessages = numberOfMessages.concat(data.json);
        }
    })
    .catch((error) => {
        showErrorMessage('Error 504. Please try again later.');
        console.log(error);
    });
}
const format = {
                "id": 1,
                "user": true,
                "bot": false,
                "content": "",
                "time": new Date().toLocaleString()
                }
const numberFormat = {
                "number_of_messages": 0
                }