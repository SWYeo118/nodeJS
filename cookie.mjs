import httpImport from 'http';
// const http = require('http');
httpImport.createServer((req, res) => {
    console.log(req.url, req.headers.cookie);
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.writeHead(200, {'Set-Cookie' : 'cookieDesu=cookie'});
    res.end('cookie입니다');
}).listen(8081, () => {
    console.log('8081포트');
});

/*
createServer를 사용하면 server 객체를 생성할 수 있다.
- server 객체의 메소드
listen(포트, 콜백) : 서버를 실행함
-res.end : 본문을 작성함
-res.setHeader : 헤더를 작성함
-writeHead나 setHeader랑 비슷하게 사용되는듯?
 */