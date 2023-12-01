const http = require('http');
const fs = require('fs').promises;

const users = {}; // 데이터 저장용

http.createServer(async (req, res) => {   // req = 요청, res = 응답
  try {
    if (req.method === 'GET') {
      if (req.url === '/') {    // 기본적으로 마지막에 '/'를 생략하고 넣어주니까
        const data = await fs.readFile('./restFront.html'); // 해당 파일을 읽은 다음
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }); // Head 부분에 써주고
        return res.end(data);   // 데이터를(restFront.html파일) 리턴해줌
                                // Header -> 데이터들에 대한 정보(메타데이터라고도 한다)
      } else if (req.url === '/about') {  // about 요청
        const data = await fs.readFile('./about.html');
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        return res.end(data); // 얘도 데이터(about.html 파일)를 리턴해준다.

      } else if (req.url === '/users') {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        return res.end(JSON.stringify(users));
      }
      // 요청하는 주소가 /도 /about도 /users도 아니면 (if문에 걸리지 않으면)
      try {
        const data = await fs.readFile(`.${req.url}`);  // 다른 애를 읽어서 보낼 수도 있다. 실제로 server2.html 적으면 얘의 페이지가 뜸
        // 그리고 css랑 js도 다같이 보내주려고 얘를 쓰는 것 같아(html에 script src 요청있음)
        return res.end(data);
      } catch (err) {
        // 주소에 해당하는 라우트를 못 찾았다는 404 Not Found error 발생
      }
    } else if (req.method === 'POST') {
      if (req.url === '/user') {
        let body = '';  // body 하나를 선언해주고
        // 요청의 body를 stream 형식으로 받음
        req.on('data', (data) => {  //on이 eventlistner처럼 특정 event를 listen할 수 있도록 해주는데, 여기서는 data 인자를 받아서 data 인자가 들어간 콜백함수를 불러오게된다.
          body += data;
        });
        // 요청의 body를 다 받은 후 실행됨
        return req.on('end', () => {
          console.log('POST 본문(Body):', body);
          const { name } = JSON.parse(body);
          const id = Date.now();
          users[id] = name;
          res.writeHead(201, { 'Content-Type': 'text/plain; charset=utf-8' });
          res.end('ok');
        });
      }
    } else if (req.method === 'PUT') {
      if (req.url.startsWith('/user/')) {
        const key = req.url.split('/')[2];
        let body = '';
        req.on('data', (data) => {
          body += data;
        });
        return req.on('end', () => {
          console.log('PUT 본문(Body):', body);
          users[key] = JSON.parse(body).name;
          res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
          return res.end('ok');
        });
      }
    } else if (req.method === 'DELETE') {
      if (req.url.startsWith('/user/')) {
        const key = req.url.split('/')[2];
        delete users[key];
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        return res.end('ok');
      }
    }
    res.writeHead(404);
    return res.end('NOT FOUND');
  } catch (err) {
    console.error(err);
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(err.message);
  }
})
  .listen(8082, () => {           //8082 포트에서 대기
    console.log('8082번 포트에서 서버 대기 중입니다');
  });
