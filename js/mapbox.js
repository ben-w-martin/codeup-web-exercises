"use strict";

(() => {
    const zoomRadios = document.querySelectorAll("#zoom-buttons input");
    const centerOfAmerica = geocode("201 SW 8th Ave, Topeka, KS 66603", MB_KEY);
    const restaurantContainer = document.querySelector(".restaurants-container");
    let zoomLevel = 3;
    const favRestaurants = [
        {
            name: "Ming's",
            address: "914 E Elmira St, San Antonio, TX 78212",
            popupHTML: "<p>Mings: World's Greatest Bao Buns</p>",
            blurb: "lorem ipsum schmipsum horem blurbum words hey."
        }, {
            name: "Muse Coffee",
            address: "1509 Enterprise Dr, Lynchburg, VA 24502",
            popupHTML: "<p>The Muse Coffee Co. And Roastery</p>",
            blurb: "lorem ipsum schmipsum horem blurbum words hey."
        }, {
            name: "Pine Coffee Supply",
            address: "47 W Pine St, Pinedale, WY 82941",
            popupHTML: "<p>Delicious Coffee by the Grand Tetons</p>",
            blurb: "lorem ipsum schmipsum horem blurbum words hey."
        }
    ];

    function renderRestaurants(restaurants) {
        restaurants.forEach(restaurant => {
            const div = document.createElement("div");
            const input = document.createElement("input");
            const card = document.createElement("div");
            const header = document.createElement("h3");
            const par = document.createElement("p");
            card.classList = "restaurant bg-white w-100 h-100 p-1";
            card.addEventListener("click", cardToRadio);
            input.value = restaurant.name;
            input.name = "restaurant-choice";
            input.type = "radio";
            input.style.display = "none";
            header.innerHTML = `<label id="restaurant-choice" for="restaurant-choice">${restaurant.name}</label>`;
            par.innerText = restaurant.blurb;
            card.appendChild(header);
            card.appendChild(input);
            card.appendChild(par);
            div.appendChild(card);
            div.classList = "p-2 bg-secondary mx-md-1 my-1 my-md-0";
            restaurantContainer.appendChild(div);
        });
    }

    // rerouts event to radio --> cardHandler
    function cardToRadio() {
        this.firstElementChild.nextElementSibling.checked = true;
        cardHandler(this);
    }

    // styles the selected restaurant card
    function cardHandler(that) {
        const thisInput = that.firstElementChild.nextElementSibling;
        const selectedRestaurant = document.querySelector(`input[name='restaurant-choice']:checked`).value;
        const restaurants = document.querySelectorAll(".restaurant");
        if (thisInput.value === selectedRestaurant) {
            that.classList.remove("bg-white");
            that.classList.add("bg-success");
            that.classList.add("text-white");
        }
        restaurants.forEach(restaurant => {
            if (that !== restaurant) {
                restaurant.classList.remove("bg-success");
                restaurant.classList.remove("text-white");
                restaurant.classList.add("bg-white");
            }
        });
    }

    mapboxgl.accessToken = MB_KEY;
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v12', // style URL
        center: [-95, 39], // starting position [lng, lat]
        zoom: zoomLevel, // starting zoom
    });
    map.addControl(new mapboxgl.NavigationControl());

    function geocode(search, token) {
        var baseUrl = 'https://api.mapbox.com';
        var endPoint = '/geocoding/v5/mapbox.places/';
        return fetch(`${baseUrl}${endPoint}${encodeURIComponent(search)}.json?access_token=${token}`)
            .then(res => res.json())
            // to get all the data from the request, comment out the following three lines...
            .then(data => data.features[0].center);
    }

    function reverseGeocode(coordinates, token) {
        var baseUrl = 'https://api.mapbox.com';
        var endPoint = '/geocoding/v5/mapbox.places/';
        return fetch(`${baseUrl}${endPoint}${coordinates.lng},${coordinates.lat}.json?access_token=${token}`)
            .then(res => res.json())
            // to get all the data from the request, comment out the following three lines...
            .then(data => data.features[0].place_name);
    }

    // geocode(favRestaurants[0].address, MB_KEY).then(result => {
    //     console.log(result);
    //     map.setCenter(result);
    //     map.setZoom(zoomLevel);
    // });

    function placeMarkerAndPopup(info, token, map) {
        info.forEach(restaurant => {
            geocode(restaurant.address, token).then(coords => {
                let popup = new mapboxgl.Popup()
                    .setHTML(restaurant.popupHTML);
                let marker = new mapboxgl.Marker()
                    .setLngLat(coords)
                    .addTo(map)
                    .setPopup(popup);
                popup.addTo(map);
            });
        });
    }

    placeMarkerAndPopup(favRestaurants, MB_KEY, map);
    renderRestaurants(favRestaurants);

    zoomRadios.forEach(rad => {
        rad.addEventListener("change", function (e) {
            // const selectedZoom = document.querySelector("")
            if (e.target.value === "zoom5") {
                zoomLevel = 5;
            } else if (e.target.value === "zoom15") {
                zoomLevel = 15;
            } else if (e.target.value === "zoom20") {
                zoomLevel = 20;
            }
            geocode(favRestaurants[0].address, MB_KEY).then(result => {
                map.setCenter(result);
                map.setZoom(zoomLevel);
            });
        })
    })
})();