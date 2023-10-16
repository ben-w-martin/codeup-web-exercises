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

let littleMermaidInput = parseFloat(prompt("It seems you owe some rental fees ($3 per day, per" +
    " movie). Answer the following before proceeding: *In numeric values only* How many days did you have The" +
    " Little Mermaid?"));
    alert(`You owe \$${littleMermaidInput * 3} on The Little Mermaid`);
let brotherBearInput = parseFloat(prompt("*In numeric values only* How many days did you have Brother" +
    " Bear?"));
    alert(`You owe \$${brotherBearInput * 3} on Brother Bear`);
let herculesInput = parseFloat(prompt("*In numeric values only* How many days did you have " +
    "Hercules?"));
    alert(`You owe \$${herculesInput * 3} on Hercules`);
console.log(littleMermaidInput, brotherBearInput, herculesInput);
let totalPrice = (littleMermaidInput + brotherBearInput + herculesInput) * 3;
alert(`At a rate of \$3 per day, your total price is \$${totalPrice.toFixed(2)}`);

// Suppose you're working as a contractor for 3 companies:
// Google, Amazon and Facebook, they pay you a different rate per hour.
// Google pays $400, Amazon $380, and Facebook $350. How much will you
// receive in payment for this week? You worked 10 hours for Facebook,
// 6 hours for Google and 4 hours for Amazon.

let Google = parseFloat(prompt("You make $400/hr at Google. Enter your hours for this week:"));
alert(`You made \$${Google * 400} at Google`);
let Amazon = parseFloat(prompt("You make $380/hr at Amazon. Enter your hours for this week:"));
alert(`You made \$${Amazon * 380} at Amazon`);
let Facebook = parseFloat(prompt("You make $350/hr at Facebook. Enter your hours for this week:"));
alert(`You made \$${Facebook * 350} at Facebook`);
// console.log(littleMermaidInput, brotherBearInput, herculesInput);
// 6, 4, 10
let totalWage = ((Google * 400) + (Amazon * 380) + (Facebook * 350));
alert(`Your total wage is is \$${totalWage.toFixed(2)}`);

// Finally, commit the changes to your git repository, and push to GitHub.