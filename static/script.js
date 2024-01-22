const socket = io();
const messages = document.getElementById('message');
const form = document.getElementById('form');
const input = document.getElementById('input');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    if(input.value) {
        socket.emit('new_message', input.value);
        input.value = '';
    }
    window.scrollTo(0, document.body.scrollHeight);
})

socket.on('message', function(msg){ 
    var itemMessage = document.createElement('div');
    itemMessage.classList.add('leftMessasge');
    var item = document.createElement('div');
    item.classList.add('leftMessageContent');
    item.appendChild(itemMessage);
    item.textContent = msg;
    messages.appendChild(item);
    window.screenTo(0, document.body.scrollHeight);
})

function changeNickname() {
    let nickname = prompt('Choose your Nickname:');
    if (nickname) {
        socket.emit('set_nickname', nickname);
    }
}

changeNickname();