import express from 'express';

const app = express();

app.set('port', process.env.PORT || 3000); //전역 세팅 설정

app.get('/', (req, res) => {
    res.send('hello express');
});

app.listen(app.get('port'), () => {
    console.log('익스프레스 서버 실행');
});