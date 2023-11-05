const http = require('http');                   // node 내장모듈을 이용해서 http 객체 생성 가능
const fs = require('fs').promises;
const server = http.createServer(async (require, response) => {      // http 객체를 이용하여 서버를 간단하게 만들 수 있다.
    try {
        response.writeHead(200, {'Content-Type': 'text/html; charset = utf-8'});
        const data = await fs.readFile('./server2.html');
        response.end(data);
    } catch (error) {
        console.error(error);
        response.writeHead(200, {'Content-Type': 'text/plain; charset = utf-8'});
        response.end(error.message);
    }
}).listen(8080, () => {                         // listen은 createServer의 method로 해당 port에서 서버가 대기하고 있겠다는 의미이다.
    console.log('8080번 서버 오픈');
});

