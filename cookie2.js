const http = require('http');
const fs = require('fs').promises;
const url = require('url');
const qs = require('querystring');


// { mycookie : 'test' }와 같은 형태를 parsing한다.
const parseCookies = (cookie = '') => cookie
    .split(';')
    .map(v => v.split('='))
    .reduce((acc, [k, v]) => {
      acc[k.trim()] = decodeURIComponent(v);
      return acc;
    }, {});
/*
쿠키 인자를 받아서 split하면 string 배열이 된다.
map 하면 인자들을 받아서 새로운 배열로 변경시킨다. 여기서는 v라는 인자를 받아서 split하여 새로운 배열화 한다.
reduce(  () => {}, {} ); 형태
배열.reduce는 빈 요소를 제외하고 배열 내에 존재하는 각 요소에 대해 callback 함수를 한 번씩 실행한다.
reduce(콜백함수, initialValue); 인데 이 중에서 initialValue는 Optional이고 콜백함수는 있어야 한다.
reduce((accumulator, currentValue) => { }, initialValue)
첫번째 받는 값은 함수, 두번째 받는 값은 initialValue
initialValue가 있으면, index 0과 initialValue를 함수에 집어넣고, 그렇지 않으면 배열의 첫 번째 값과 두 번째 값을 함수에 집어넣는다.
decodeURIComponent는 URI 요소를 deCode하고, encodeURIComponent는 encode한다.
 */

/*
쿠키는 클라이언트에 저장되니까 서버에 가해지는 부하가 적은 것에 비해, 세션은 서버에 저장되기 때문에 서버 부하가 있다.
또한 쿠키는 저장이 되기 때문에 개발자 도구만 열어서 봐도 조작이 가능함
 */

http.createServer(async (req, res) => {
  const cookies = parseCookies(req.headers.cookie); // { mycookie: 'test' }
  // 주소가 /login으로 시작하는 경우
  if (req.url.startsWith('/login')) {
    const { query } = url.parse(req.url);
    const { name } = qs.parse(query);
    const expires = new Date();
    // 쿠키 유효 시간을 현재시간 + 5분으로 설정
    expires.setMinutes(expires.getMinutes() + 5);
    //302는 redirection httpCode이다.
    res.writeHead(302, {
      Location: '/',
      'Set-Cookie': `name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
    });
    // httpOnly하면 javascript가 아니기떄문에 악성 javascript 코드를 심을 수 없다.
    // encodeURIComponent로 한글로 인한 인코딩 문제를 방지한다.
    res.end();
  // name이라는 쿠키가 있는 경우
  } else if (cookies.name) {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(`${cookies.name}님 안녕하세요`);
  } else {
    try {
      const data = await fs.readFile('./cookie2.html');
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(data);
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(err.message);
    }
  }
}
).listen(8084, () => {
    console.log('8084번 포트에서 서버 대기 중입니다!');
  });
