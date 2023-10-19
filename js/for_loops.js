"use strict";

const showMultiplicationTable = (num) => {
    for (let i = 1; i <= 10; i++) {
        let product = 0;
        product = num * i;
        console.log(`${num} x ${i} = ${product}`);
    }
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

// Exercise 3
const randomEvenOrOdd = () => {
    // let nextRandomNumber = 0;
    for (let i = 0; i < 10; i++) {
        console.log(`${randomNumber} is ${evenOrOdd(randomNumber)}`);
        randomNumber = Math.floor(Math.random() * (200 - 20 + 1) ) + 20;
    }
}

randomEvenOrOdd();

// Exercise 4
const numberPyramid = () => {
    let counter = 1;
    for (let i = 1; i < 10; i++) {
        console.log(i * counter);
        counter += "1";
    }
}
numberPyramid();

const countByFives = () => {
    let difference = 105;
    for (let i = 0; i < 20 ; i++) {
        difference -= 5;
        console.log(difference);
    }
}
countByFives();























