console.log("Hello from external JavaScript");

alert('Welcome to my Website!');

let userString1 = prompt("What is your favorite color?");

alert(`"Great, ${userString1} is my favorite color too!`);

// Complete exercise 3 from the previous lesson, but write your code in
// the external.js file instead of in the console.
//     When the exercise asks you to use a number, instead use a prompt
//     to ask the user for that number.
//     Use an alert to show the results of each problem.

let littleMermaidInput = prompt("It seems you owe some rental fees. Answer the following before proceeding: How many days did you have The Little Mermaid?");
let brotherBearInput = prompt("How many days did you have Brother Bear?");
let herculesInput = prompt("How many days did you have Hercules?");

littleMermaidInput = Number(littleMermaidInput); // 3
brotherBearInput = Number(brotherBearInput); // 5
herculesInput = Number(herculesInput); // 1

let totalPrice = (littleMermaidInput + brotherBearInput + herculesInput) * 3;

alert(`At a rate of \$3 per day, your total price is \$${totalPrice}`);

// Finally, commit the changes to your git repository, and push to GitHub.