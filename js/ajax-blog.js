"use strict";

(()=>{
    const posts = document.querySelector("#posts");

    fetch("../data/blog.json").then(response => response.json()).then(data => {
        console.log(data);
        data.forEach(item => {
            const newPostContainer = document.createElement("div");
            const newHeading = document.createElement("h3");
            const newPost = document.createElement("p");
            newPostContainer.classList.add("post");
            newHeading.innerText = item.title;
            newPost.innerText = item.content;
            newPostContainer.appendChild(newHeading);
            newPostContainer.appendChild(newPost);
            posts.appendChild(newPostContainer);
        })
    });
})();