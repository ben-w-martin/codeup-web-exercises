"use strict";

import randomGreeting from "./greeting-logic.js";

(() => {
    const submitBtn = document.querySelector("#submit-btn");
    const greeting = document.querySelector("#greeting");

    function renderGreeting() {
        const name = document.querySelector("#name").value;
        greeting.innerHTML = `${randomGreeting()}, ${name}`;
    }

    submitBtn.addEventListener("click", renderGreeting);
})();