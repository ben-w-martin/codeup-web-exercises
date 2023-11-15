"use strict";

// Now, let's use JavaScript to manipulate these elements:
//
// Two seconds after the page loads, change the "profile-pic" src attribute to a different image.
//     Four seconds after the page loads, use innerHTML to change the name in "profile-name".
//     Six seconds after page loads, add a new class to "profile-desc" that changes the color
//     and font of the description text.
//     Use setTimout to create these behaviors.
//     Write code that toggles a class on the "profile-card" that changes its background color
//     every two seconds. Use setInterval.

//     Bonus
// Encapsulate all your timers in a single function.
// Instead of toggling the background color every two seconds for the "profile-card", create an
// array of colors and programmatically change the background color every two seconds.
//     Hint: You will have to choose a RANDOM index from the array of colors.
//
//     After all of your timeouts have expired, bring up a prompt that will change "profile-name"
//     text to whatever the user inputs.

(() => {
    const profilePic = document.querySelector("#profile-pic");
    const profileName = document.querySelector("#profile-name");
    const profileDesc = document.querySelector("#profile-desc");
    const profileCard = document.querySelector("#profile-card");
    const toggleBtn = document.querySelector("#toggle-btn");
    const rainbow = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];

    function getRandomInt(min, max) {
        if (typeof min === "boolean" || typeof max === "boolean" ||
            min === null || max === null) {
            return NaN;
        }
        return Math.floor((Math.random() * (max - min + 1)) + min);
    }

    const changeContent = () => {
        let count = 0;
        let intervalId = setInterval(function () {
            count++;
            profileCard.classList = [];
            profileCard.classList.add(rainbow[getRandomInt(0, rainbow.length - 1)]);
            switch (count) {
                case 1:
                    return profilePic.setAttribute("src", "../images/github-icon.png");
                case 2:
                    return profileName.innerHTML = "The Donut Man";
                case 3:
                    return profileDesc.style.color = "orangered",
                        profileDesc.style.fontFamily = "'nove', sans-serif";
                case 4:
                    const newProfileName = prompt("Pick a new name!");
                    return profileName.innerText = newProfileName;
                default:
                    break;
            }

        }, 2000);

    }

    toggleBtn.addEventListener("click", changeContent);


})();