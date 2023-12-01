"use strict";

(() => {
    const zoomSlider = document.querySelector("#zoom");
    const centerOfAmerica = geocode("201 SW 8th Ave, Topeka, KS 66603", MB_KEY);
    const restaurantContainer = document.querySelector(".restaurants-container");
    let zoomLevel = 3;
    const favRestaurants = [
        {
            name: "Ming's",
            address: "914 E Elmira St, San Antonio, TX 78212",
            popupHTML: "<p>Mings: World's Greatest Bao Buns. Chinese fusion in the heart of San Antonio.</p>",
            blurb: "914 East Elmira Street\n" +
                "San Antonio, TX 78212\n" +
                "(210) 600-4083\n" +
                "\n" +
                "T - S | 11:00am - 10:00pm\n" +
                "Closed on Monday\n"
        }, {
            name: "The Muse",
            address: "1509 Enterprise Dr Lynchburg, VA 24502",
            popupHTML: "<p>The Muse Coffee Co. And Roastery. Fresh roasted coffee and breakfast food.</p>",
            blurb: "1509 Enterprise Drive\n" +
                "Lynchburg, VA 24502\n" +
                "(434) 237-8878\n" +
                "\n" +
                "M–F | 7:00am – 7:00pm\n" +
                "Saturday 8:00am - 7:00pm\n" +
                "Closed Sunday"
        }, {
            name: "Pine Coffee Supply",
            address: "47 W Pine St, Pinedale, WY 82941",
            popupHTML: "<p>Delicious Specialty Coffee right under the Grand Tetons.</p>",
            blurb: "47 W Pine St\n" +
                "Pinedale, WY 82941\n" +
                "(307) 367-4343" +
                "\n" +
                "\n" +
                "M-F | 7:30am - 2:30pm\n" +
                " Sun 8:00am - 2:00pm"
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

            div.classList = "col-md-3 p-2 bg-secondary my-1 my-md-0";


            restaurantContainer.appendChild(div);
        });
    }

    // rerouts event to radio --> cardHandler
    function cardToRadio() {
        this.firstElementChild.nextElementSibling.checked = true;
        radioCards(this);
    }

    // styles the selected restaurant card
    function radioCards(that) {
        const thatInput = that.firstElementChild.nextElementSibling;
        const selectedRestaurant = document.querySelector(`input[name='restaurant-choice']:checked`).value;
        const restaurants = document.querySelectorAll(".restaurant");
        if (thatInput.value === selectedRestaurant) {
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
        getCurrentRestaurant();
    }

    function getCurrentRestaurant() {
        const selectedRestaurant = document.querySelector(`input[name="restaurant-choice"]:checked`).value;
        favRestaurants.forEach(store => {
            if (store.name === selectedRestaurant) {
                runGeocode(store.address, MB_KEY);
                placePopup(store, MB_KEY, map);
            }
        })
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

    function runGeocode(search, token) {
        geocode(search, token).then(result => {
            console.log(result);
            map.setCenter(result);
            map.setZoom(zoomLevel);
        });
    }

    function placeMarker(info, token, map) {
        info.forEach(restaurant => {
            geocode(restaurant.address, token).then(coords => {
                let marker = new mapboxgl.Marker()
                    .setLngLat(coords)
                    .addTo(map)
            });
        });
    }

    function placePopup(info, token, map) {
        geocode(info.address, token).then(coords => {
            let popup = new mapboxgl.Popup()
                .setHTML(info.popupHTML);
            let marker = new mapboxgl.Marker()
                .setLngLat(coords)
                .addTo(map)
                .setPopup(popup);
            popup.addTo(map);
        });
    }

    function getZoomLevel() {
        // const selectedRestaurant = document.querySelector(`input[name="restaurant-choice"]:checked`).value;
        if (this !== undefined) {
            zoomLevel = zoomSlider.value;
            console.log(zoomLevel);
            getCurrentRestaurant();
            map.setZoom(+zoomLevel);
        } else {
            zoomLevel = 3;
        }
        return zoomLevel;

    }

    renderRestaurants(favRestaurants);
    placeMarker(favRestaurants, MB_KEY, map);

    zoomSlider.addEventListener("change", getZoomLevel);
})();