import express from 'express';
import path from 'path';

const app = express();

app.set('port', process.env.PORT || 3000); //전역 세팅 설정

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
// path.join 하면 여러 인자들을 합쳐서 하나의 경로로 만들어준다. __dirname 하면 절대경로 디렉토리, __filename하면 절대경로 파일경로
// fs 파일시스템 사용할 필요도 없이 그냥 sendFile하면 파일까지 읽어서 서버로 전달을 해줌

app.post('/', (req, res) => {
    res.send('hello express');
});
app.get('/about', (req, res) => {
    res.send('hello express');
});

app.listen(app.get('port'), () => {
    console.log('익스프레스 서버 실행');
});