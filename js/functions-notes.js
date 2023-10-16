"use strict"

function helloWorld() {
    return "Hello World!";
}

 parseInt("67");
console.log(confirm("Would you like to submit?"));

let hello = helloWorld();
console.log(hello);

/* ----Using functions-----
*
* -----Defining functions------
*
* - Keyword function
* - name of function in camelCase
* - set of parentheses
* - a body, including the logic you write
* - a return statement
* - inputs (parameters) and outputs (return statements) are optional
* - return statement ceases the function process. Nothing is read afterwards.
* - Functions should generally have a single responsibility
*/

// finds the sum of two numeric values;
function addNumbers(num1, num2) {
    let sum = num1 + num2;
    return sum;
}

let num1 =parseInt(prompt("Type a number to add: "));
let num2 =parseInt(prompt("Type another number to add: "));
let sum = addNumbers(num1, num2);
alert(`${num1} + ${num2} = ${sum}`);
console.log(addNumbers(num1, num2));

// -----Anonymous Functions-----
const increment = function(x){
    return x + 1;
}

let two = increment(1);
console.log(two);

/* -----Arrow functions-----
* no return statement on single link.
* Multi-line requires {} + "return"
 */

// GLOBAL VARIABLES
let globalVar = "I'm a global variable";
function varAlert(){
    alert(globalVar);
}

varAlert();

// LOCAL VARIABLES
function localVarAlert() {
    let localVar = "Hey! I'm a local Variable";
    alert(localVar);
    alert(globalVar);
    return localVar;
}

let local = localVarAlert();
console.log(local);

const helloWorld2 = () => "hello world (TWO)";

/* -----Function scope-----
*
* -----Guidelines and best practices-----
* - If your function is > 20 lines, consider refactoring;
* - A function should do one thing;
* - functions should be at the top of your page;
 */