"use strict";

const showMultiplicationTable = (num) => {
    let product = 0;
    console.log(`${num} x 1 = ${num * 1}`);
    console.log(`${num} x 2 = ${num * 2}`);
    console.log(`${num} x 3 = ${num * 3}`);
    console.log(`${num} x 4 = ${num * 4}`);
    console.log(`${num} x 5 = ${num * 5}`);
    console.log(`${num} x 6 = ${num * 6}`);
    console.log(`${num} x 7 = ${num * 7}`);
    console.log(`${num} x 8 = ${num * 8}`);
    console.log(`${num} x 9 = ${num * 9}`);
    console.log(`${num} x 10 = ${num * 10}`);
}
showMultiplicationTable(5);

let randomNumber = Math.floor(Math.random() * 200 - 20) + 20;

const evenOrOdd = (num) => {
    if (num % 2 == 0) {
        return "even";
    } else {
        return "odd";
    }
}

const randomEvenOrOdd = () => {
    // let nextRandomNumber = 0;
    for (let i = 0; i < 10; i++) {
        console.log(`${randomNumber} is ${evenOrOdd(randomNumber)}`);
        randomNumber = Math.floor(Math.random() * 200 - 20) + 20;
    }
}

console.log(randomEvenOrOdd());





