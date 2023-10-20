"use strict";

let i = 1;
let product = 1;

while (i <= 16) {
    product = product * 2;
    console.log(product);
    i++;
}

let totalCones = Math.floor(Math.random() * (100 - 50 + 1)) + 50;
let conesPerCustomer;
do {
    conesPerCustomer = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
    if (totalCones > conesPerCustomer) { // prevents total cones going into negatives
        console.log(`There are ${totalCones}. You get ${conesPerCustomer} cone[s], leaving ${totalCones - conesPerCustomer}`);
        totalCones -= conesPerCustomer;
    } else if (conesPerCustomer > totalCones && totalCones !== 0) { //
        console.log(`Sorry, you can't have ${conesPerCustomer} because there are/is only ${totalCones} left.`);
    } else {
        console.log(`You need ${conesPerCustomer} and we have ${totalCones} left. Congrats! All cones are sold!`);
        totalCones -= conesPerCustomer;
    }
} while (totalCones > 0);

