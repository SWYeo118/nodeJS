console.log(1);

const promise = function () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(3);         // 이 promise가 실행될 때 그냥 실행이 된다.
            resolve("two");   // 이 promise가 성공했을 때 해당 값을 반환한다.(return)
        }, 3000);
    });
};

const promiseTwo = function () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("one");
        }, 1000);
    });
};


console.log(2);

async function foo() {
    const result = await promise(); // 3초 기다리고 해당 promise가 실행되고 resolve 값은 result에 저장이 된다.
    const resultTwo = await promiseTwo(); // 1초 기다리고 해당 resolve 값이 저장이 된다.

    console.log(resultTwo); // resultTwo의 resolve값인 one이 저장되어서 출력이 된다.

    const parellOne = promise(); // 위 아래 타이머는 동시에 시작됨.
    const parelltwo = promiseTwo(); // 해당 프로미스 이행 값이 먼저 반환됨.(약 1초)

    console.log(await parellOne); // await은 변수에 사용하며, 해당 변수가 차례차례 내려오도록 한다.
    console.log(await parelltwo); // 먼저 프로미스 객체가 반환되었지만 위 함수가 먼저 실행되어야 실행됨.
}

foo(); // 콘솔에 찍히는 값은 순서대로 1 2 3 "one" 3 "two" "one"