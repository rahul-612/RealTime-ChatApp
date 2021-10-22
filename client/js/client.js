const socket = io(process.env.PORT || 'http://localhost:8000');

// Get DOM elements in respective Js variables
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp')
let messageContainer = document.querySelector(".container")

// Audio that will play on receiving messages
var audio = new Audio('resources/ting.mp3');

// Function which will append event info to the contaner
const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerHTML = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position); 
    messageContainer.append(messageElement);
    if(position =='left'){ 
        messageElement.style.backgroundColor="rgb(255 197 255)";
        audio.play();
        
    }
}

// Ask new user for his/her name and let the server know
let name = prompt("Enter your name to join");


socket.emit('new-user-joined', name);

// If a new user joins, receive his/her name from the server
socket.on('user-joined', name =>{
    append(`<b>${name}</b> joined the chat`, 'right')
})

// If server sends a message, receive it
socket.on('receive', data =>{
    append(`<b>${data.name}:</b> ${data.message}`, 'left')
})

// If a user leaves the chat, append the info to the container
socket.on('left', name =>{
    append(`${name} left the chat`, 'right')
})

// If the form gets submitted, send server the message
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`<b>You:</b> ${message}`, 'right');     
    socket.emit('send', message);
    messageInput.value = ''
})


//styling

messageInput.addEventListener('focus',()=>{
    messageInput.style.border="solid 4px #dca1e8";
})
messageInput.addEventListener('blur',()=>{
    messageInput.style.border="2px solid black";
})
