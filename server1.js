const http = require('http');                   // node 내장모듈을 이용해서 http 객체 생성 가능
const server = http.createServer((require, response) => {      // http 객체를 이용하여 서버를 간단하게 만들 수 있다.
    response.write('<h1>hello Node!</h1>')      // write를 통해서 글자를 써내려갈 수 있다. (write와 end 모두 stream임)
    response.write('<p>hello Server!</p>')
    response.end('<p>hello sangwoo!</p>')
}).listen(8080, () => {                         // node에서 서버를 process에 올려주어야 하니까 올려주고, listen에 대한 콜백함수를 작성한다.
    console.log('8080번 서버 오픈');
});

