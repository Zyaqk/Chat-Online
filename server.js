const http = require('http');
const path = require('path');
const fs = require('fs');

const indexHtmlFile = fs.readFileSync(path.join(__dirname, 'static', 'index.html'));
const styleCssFile = fs.readFileSync(path.join(__dirname, 'static', 'style.css'));
const scriptJsFile = fs.readFileSync(path.join(__dirname, 'static', 'script.js'));


const server = http.createServer((request, response) => {
    switch(request.url) {
        case '/': return response.end(indexHtmlFile);
        case '/style.css': return response.end(styleCssFile);
        case '/script.js': return response.end(scriptJsFile);
    }
    response.statusCode = 404;
    return response.end('Error 404');
})

server.listen(3000);