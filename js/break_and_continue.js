"use strict";

let userInput = parseFloat(prompt("Enter an odd number between 1 and 50."));
let params = (userInput < 50 && userInput > 0 && (userInput % 2) !== 0);

while (params === false) {
    userInput = parseFloat(prompt("Invalid input! Enter an odd number between 1 and 50."));
    params = (userInput < 50 && userInput > 0 && (userInput % 2) !== 0);
    if (params === true) {
        break;
    }
}

console.log("Number to skip is: " + userInput);

for (let i = 1; i < 50; i++) {
    if (i % 2 === 0) { // skips even i values;
        continue;
    }
    if (userInput === i) {
        console.log("Yikes! Skipping: " + i);
    } else {
        console.log("Odd Number: " + i);
    }
}

