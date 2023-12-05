"use strict";

export default function getRandomInt(min, max) {
    if (typeof min === "boolean" || typeof max === "boolean" ||
        min === null || max === null){
        return NaN;
    }
    return Math.floor((Math.random() * (max - min + 1)) + min);
}