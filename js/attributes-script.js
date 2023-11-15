"use strict";

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