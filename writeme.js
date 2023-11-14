const fs = require('fs').promises; // fs 모듈은 promise를 지원하는데, 이걸 promises로 하면 됨!

fs.writeFile('./writeme.txt', '글자가 입력됩니다.')
    .then(() => {

    })
    .catch((error) => {
        throw error;
    });