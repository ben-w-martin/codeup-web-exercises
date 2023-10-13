"use strict"

console.log("Hello from external JavaScript");

alert("Welcome to my Website!");

let favColor = prompt("What is your favorite color?");

alert(`Great, ${favColor} is my favorite color too!`);

// Complete exercise 3 from the previous lesson, but write your code in
// the external.js file instead of in the console.
//     When the exercise asks you to use a number, instead use a prompt
//     to ask the user for that number.
//     Use an alert to show the results of each problem.

let littleMermaidInput = prompt("It seems you owe some rental fees ($3 per day, per movie). Answer the following before proceeding: *In numeric values only* How many days did you have The Little Mermaid?");
    alert(`You owe \$${Number(littleMermaidInput) * 3} on The Little Mermaid`);
let brotherBearInput = prompt("*In numeric values only* How many days did you have Brother Bear?");
    alert(`You owe \$${Number(brotherBearInput) * 3} on Brother Bear`);
let herculesInput = prompt("*In numeric values only* How many days did you have Hercules?");
    alert(`You owe \$${Number(herculesInput) * 3} on Hercules`);
console.log(littleMermaidInput, brotherBearInput, herculesInput);

littleMermaidInput = Number(littleMermaidInput); // 3
brotherBearInput = Number(brotherBearInput); // 5
herculesInput = Number(herculesInput); // 1
console.log(littleMermaidInput, brotherBearInput, herculesInput);
let totalPrice = (littleMermaidInput + brotherBearInput + herculesInput) * 3;


alert(`At a rate of \$3 per day, your total price is \$${totalPrice}`);

// Finally, commit the changes to your git repository, and push to GitHub.