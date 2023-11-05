const http = require('http');                   // node 내장모듈을 이용해서 http 객체 생성 가능
const server = http.createServer((require, response) => {      // http 객체를 이용하여 서버를 간단하게 만들 수 있다.
    response.writeHead(200, {'Content-Type': 'text/html; charset = utf-8'});
    response.write('<h1>hello Node!</h1>');      // write를 통해서 글자를 써내려갈 수 있다. (write와 end 모두 stream임)
    response.write('<p>hello Server!</p>');
    response.end('<p>hello sangwoo!</p>');
}).listen(8080, () => {                         // listen은 createServer의 method로 해당 port에서 서버가 대기하고 있겠다는 의미이다.
    console.log('8080번 서버 오픈');
});

