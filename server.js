const http = require('http');
const path = require('path');
const fs = require('fs');
const db = require('database');

const indexHtmlFile = fs.readFileSync(path.join(__dirname, 'static', 'index.html'));
const styleCssFile = fs.readFileSync(path.join(__dirname, 'static', 'style.css'));
const scriptJsFile = fs.readFileSync(path.join(__dirname, 'static', 'script.js'));

const registerHtmlFile = fs.readFileSync(path.join(__dirname, 'static', 'register.html'));
const registerCssFile = fs.readFileSync(path.join(__dirname, 'static', 'styleregister.css'));
const registerJsFile = fs.readFileSync(path.join(__dirname, 'static', 'scriptregister.js'));

const server = http.createServer((request, response) => {
    if (request.method === 'GET') {
        switch(request.url) {
            case '/': return response.end(indexHtmlFile);
            case '/style.css': return response.end(styleCssFile);
            case '/script.js': return response.end(scriptJsFile);
            case '/register': return response.end(registerHtmlFile);
            case '/styleregister.css': return response.end(registerCssFile);
            case '/scriptregister.js': return response.end(registerJsFile);
        }
    }
    if (request.method === 'POST') {
        switch(request.url) {
            case '/api/register': return registerUser(request, response);
            
        }
    }
    response.statusCode = 404;
    return response.end('Error 404');
})

function registerUser(request, response) {
    let data = '';
    request.on('data', function(chunk) {
        data += chunk;
    });
    request.on('end', async function() {
        try {
            const user = JSON.parse(data);
            if (!user.login || !user.password) {
                return response.end('Empty login or password!');
            }
            if (await db.isUserExits(user.login)) {
                return response.end('User already exist');
            }
            await db.addUser(user);
            return response.end('Registration is successfull!');
        } catch(e) {
            return response.end('Error: ' + e);
        }
    })
}

server.listen(3000);

const { Server } = require('socket.io');
const { response } = require('express');
const { request } = require('https');
const io = new Server(server);

io.on('connection', async (socket) => {
    console.log('a user connected. id -' + socket.id);
    let userNickname = 'user';
    let messages = await db.getMessages();

    socket.on('new_message', (message) => {
        db.addMessage(message, 1);
        io.emit('message', userNickname + ': ' + message);
    })

    socket.on('set_nickname', (nickname) => {
        userNickname = nickname;
    })
})