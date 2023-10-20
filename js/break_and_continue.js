"use strict";

(() => {
    let userInput = parseFloat(prompt("Enter an odd number between 1 and 50."));
    let params = (userInput < 50 && userInput > 0 && (userInput % 2) !== 0);
    while (true) {
        if (userInput < 50 && userInput > 0 && (userInput % 2) !== 0) {
            break;
        }
        userInput = parseFloat(prompt("Invalid input! Enter an odd number between 1 and 50."));
    }

    console.log("Number to skip is: " + userInput);

    for (let i = 1; i < 50; i += 2) {
        if (userInput === i) {
            console.log("Yikes! Skipping: " + i);
            continue;
        } else {
            console.log("Odd Number: " + i);
        }
    }
})();