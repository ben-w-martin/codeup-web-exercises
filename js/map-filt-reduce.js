"use strict";

(() => {
    const hamsters = [
        {
            name: "Hamtaro",
            heightInMM: 86,
            fur: ['orange', 'white'],
            gender: "male",
            dateOfBirth: "August 6"
        }, {
            name: "Bijou",
            heightInMM: 75,
            fur: ['white'],
            gender: "female",
            dateOfBirth: "July 10"
        }, {
            name: "Oxnard",
            heightInMM: 100,
            fur: ['grey', 'white'],
            gender: "male",
            dateOfBirth: "May 3"
        }, {
            name: "Boss",
            heightInMM: 120,
            fur: ['brown', 'white'],
            gender: "male",
            dateOfBirth: "September 21"
        }, {
            name: "Snoozer",
            heightInMM: 85,
            fur: ['brown', 'white', "pink"],
            gender: "male",
            dateOfBirth: "January 14"
        }
    ];
    const numbers = [1, 2, 3, 4];

    const hamsterNames = hamsters.map(hamster => {
        return {name: hamster.name, height: hamster.heightInMM}
    });
    const numbersMultipliedBy3 = numbers.map(num => num * 3);

    console.log(hamsters);
    console.log(hamsterNames);
    console.log(numbers)
    console.log(numbersMultipliedBy3);

    const evenNumbers = numbers.filter(num => num % 2 === 0);

    console.log(evenNumbers);

    const hamstersAtLeast100MMInHeight = hamsters.filter(hamster => hamster.heightInMM >= 100);
    const hamsterNamesAtLeast100MMInHeight = hamsters.filter(hamster => hamster.heightInMM >= 100).map(hamster => hamster.name);
    console.log(hamstersAtLeast100MMInHeight);
    console.log(hamsterNamesAtLeast100MMInHeight);

    const sum = numbers.reduce((total, number) => total + number, 0);
    console.log(sum);

    const closetColors = ["black", "grey", "brown", "olive green"];
    const birthdayJacketColors = {brand: "Fur Jacket" , fur: ["black", "blue", "white"]};
    function addUniqueColors(arrOfColors, obj) {
        for (let color of obj.fur) {
            if (!arrOfColors.includes(color)) {
                arrOfColors.push(color);
            }
        }
        return arrOfColors;
    }

    const colorsOfHamsters = hamsters.reduce(addUniqueColors, []);
    console.log(colorsOfHamsters);
})();