"use strict";

/*
* IIFE "Iffy" => immediately invoked function expression. Prevents Global scope variable pollution. Immediately runs
* code within, inaccessibly to scope without.
*
* Example: (() => {} )();
*
*  (() => {
*----------variables, functions are run, but cannot be called elsewhere.
*  })();
*
*  Math.random()
*  To generate random number: Math.floor(Math.random() * (max - min + 1) + min);
*  "+ 1" makes max and min inclusive.
*/


(() => {
    const showMultiplicationTable = (num) => {
        for (let i = 1; i <= 10; i++) {
            let product = 0;
            product = num * i;
            console.log(`${num} x ${i} = ${product}`);
        }
    }
    showMultiplicationTable(5);
})();

(() => {
    let randomNumber = Math.floor(Math.random() * (200 - 20 + 1)) + 20;

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
            randomNumber = Math.floor(Math.random() * (200 - 20 + 1)) + 20;
        }
    }

    randomEvenOrOdd();
})();

(() => {
// Exercise 4
const numberPyramid = () => {
    for (let i = 1; i < 10; i++) {
        console.log(i.toString().repeat(i));
    }
}
numberPyramid();
})();

(() => {
const countByFives = () => {
    for (let i = 100; i > 0; i -= 5) {
        console.log(i);
    }
}
countByFives();
})();






















