"use strict";

(() => {
    const myUsername = "ben-w-martin";
    const mostRecentCommitDate = getInfo(myUsername);

    function getInfo(username) {
        fetch(`https://api.github.com/users/${username}/events/public`, {headers: {'Authorization': `token ${GH_KEY}`}}).then(response => response.json()).then(data => {
            console.log(data);
            const commitsByDate = [];
            data.forEach(item => {
                if ("commits" in item.payload) {
                    commitsByDate.push(item.created_at);
                }
            });
            commitsByDate.sort((a, b) => b - a);
            console.log(commitsByDate[0]);
            return commitsByDate[0];
        }).catch(er => console.log("Error: ", er));
    }

    const displayCommitDate = (date) => {
        const dateToDisplay = document.createElement("p");
        dateToDisplay.innerText = date;
        document.querySelector("#commit-message").appendChild(dateToDisplay);
    }

    displayCommitDate(mostRecentCommitDate);

})();