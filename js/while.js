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
    if (totalCones > conesPerCustomer) { //
        console.log(`You asked for ${conesPerCustomer} cones. There are ${totalCones - conesPerCustomer} left.`);
        totalCones -= conesPerCustomer;
    } else if (conesPerCustomer > totalCones && totalCones !== 0) { // breaks loop
        console.log(`Sorry, you can't have ${conesPerCustomer} because there are only ${totalCones} left for the day.`);
    } else {
        console.log(`You need ${conesPerCustomer} and we have ${totalCones} left. Congrats! All cones are sold!`);
        totalCones -= conesPerCustomer;
    }

} while (totalCones > 0);





