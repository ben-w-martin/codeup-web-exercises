"use strict";

const nextBtn = document.getElementById("next-btn1");
const sizeTab = document.getElementById("size-and-crust-tab");
const cheeseTab = document.getElementById("cheese-and-sauce-tab");
const toppingsTab = document.getElementById("toppings-tab");

document.getElementById("next-btn1").addEventListener("click", function () {
    // Trigger the click event on the tab you want to switch to
    $("#cheese-and-sauce-tab").tab("show");

    // You can also hide the current tab if needed
    // $("#size-and-crust-tab").tab("hide");
});
document.getElementById("prev-btn").addEventListener("click", function () {
    // Trigger the click event on the tab you want to switch to
    $("#size-and-crust-tab").tab("show");

    // You can also hide the current tab if needed
    // $("#size-and-crust-tab").tab("hide");
});
document.getElementById("next-btn2").addEventListener("click", function () {
    // Trigger the click event on the tab you want to switch to
    $("#toppings-tab").tab("show");

    // You can also hide the current tab if needed
    // $("#size-and-crust-tab").tab("hide");
});
