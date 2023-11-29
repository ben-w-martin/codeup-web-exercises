"use strict";

(() => {
    const myUsername = "ben-w-martin";

    function getInfo(username) {
        const commitsByDate = [];
        let date = "";
        fetch(`https://api.github.com/users/${username}/events/public`, {headers: {'Authorization': `token ${GH_KEY}`}}).then(response => response.json()).then(data => {
            data.forEach(item => {
                if ("commits" in item.payload) {
                    commitsByDate.push(item.created_at);
                }
            });
            commitsByDate.sort((a, b) => b - a);
            date = commitsByDate[0];
        }).then(displayCommitDate => {
            const dateToDisplay = document.createElement("p");
            dateToDisplay.innerText = date;
            document.querySelector("#commit-message").appendChild(dateToDisplay)
        }).catch(er => console.log("Error: ", er));
    }

    getInfo(myUsername);

})();