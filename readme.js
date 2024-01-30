const fs = require('fs').promises; // fs 모듈은 promise를 지원하는데, 이걸 promises로 하면 됨!

fs.readFile('./readme.txt')
    .then((data) => {
            console.log(data);
            console.log(data.toString());
    })
    .catch((error) => {
        throw error;
    });

/*
fs 모듈의 기본 이름이 데이터인가봐.
 */