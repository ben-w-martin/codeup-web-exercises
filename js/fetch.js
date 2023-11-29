"use strict";

(() => {
    // import GH_KEY from "./keys";

    fetch("https://api.github.com/users/{username}/events/public'", {headers: {'Authorization': `token ${GH_KEY}`}}).then(response => response.json()).then(data => console.log(data)).catch(er => console.log("Error: ", er));
})();
