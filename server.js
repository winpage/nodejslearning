const http = require('http');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.write('<b>Thang</b>\n');
  res.end('Hello World\n');
});

server.listen(3000, 'localhost', () => {
    console.log('NodeJS is running');
    console.log('$date: ' + new Date);
})