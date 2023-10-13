"use strict";
let pi = 3.14;
console.log(pi);
console.log(5 + 4); // console.log only prints to console - nothing else

let instructorName = "David";
let studentName = "Ben";
let myDogName = "Piper";
console.log(instructorName + " is the instructor. " + studentName + " is the student. " + myDogName + " is the student's dog.")
let favoriteColor = "Blue";
console.log(favoriteColor);

// Alert - pop-up message to user from JS
alert("Hey! It's JS here.");
// Heyyyy
//we can concat inside alert
alert(`howdy, from ${studentName}, ${instructorName}, and ${myDogName}!!!`);

// confirm - pop-up message to user from JS w/ ability to capture a boolean
let confirmed = confirm(`We have lunch at 12:30 today?.`);
console.log(`lunch choice: ${confirmed}`);

// prompt - pop-up message to user from JS asking for a text value/response
let userString = prompt("What is your favorite Basketball Team? ");
console.log(`User's favorite team: ${userString.trim()}`);