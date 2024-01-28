const fs = require('fs').promises; // fs 모듈은 promise를 지원하는데, 이걸 promises로 하면 됨!

fs.writeFile('./writeme.txt', '글자가 입력됩니다.')
    .then(() => {
        return fs.readFile('./writeme.txt');
    })
    .then((data) => {
        console.log(data.toString());
    })
    .catch((error) => {
        throw error;
    });

// fs로 파일시스템 모듈을 불러온다.