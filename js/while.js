"use strict";

let i = 1;
let product = 1;

while (i <= 16) {
    product = product * 2;
    console.log(product);
    i++;
}

let totalCones = Math.floor(Math.random() * (100 - 50 + 1) ) + 50;
console.log(totalCones);
let conesPerCustomer;
do {
    conesPerCustomer = Math.floor(Math.random() * (5 - 1 + 1) ) + 1;
    if (conesPerCustomer > totalCones) {
        console.log(`Sorry, you can't have ${conesPerCustomer} because there are only ${totalCones} left for the day.`);
        break;
    }
    if (totalCones < 5 && conesPerCustomer > totalCones) {
        console.log(`Sorry, you can't have ${conesPerCustomer} because there are only ${totalCones} left for the day.`)
        break;
    }
    if (totalCones === conesPerCustomer) {
        console.log("Congrats! All cones are sold!");
        break;
    }
    totalCones -= conesPerCustomer;
} while (totalCones >= 0);





