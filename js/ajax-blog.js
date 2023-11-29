"use strict";

(()=>{
    const posts = document.querySelector("#posts");

    fetch("../data/blog.json").then(response => response.json()).then(data => {
        data.forEach(item => {
            const newPostContainer = document.createElement("div");
            const newHeading = document.createElement("h3");
            const newPost = document.createElement("p");
            const tagSpan = document.createElement("span");
            newPostContainer.classList.add("post");
            newHeading.innerText = item.title;
            newPost.innerText = item.content;
            tagSpan.innerHTML = item.categories.map(cat => `<a href="#" class="tag">${cat} </a>`).join("");
            newPostContainer.appendChild(newHeading);
            newPostContainer.appendChild(newPost);
            newPostContainer.appendChild(tagSpan);
            posts.appendChild(newPostContainer);
        })
    });
})();