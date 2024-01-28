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

/* fs로 파일시스템 모듈을 불러온다.
writeFile로 해당 데이터를 입력한다.
그리고 then으로 해당 파일을 writeme.txt 라는 파일에 쓴다.
그리고 data를 콘솔로그로 출력한다. js.writeFile의 데이터 기본값이 'data'인듯
마지막 .catch로 에러 잡아서 출력
 */
