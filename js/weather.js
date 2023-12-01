"use strict";

(() => {
    const mapContainer = document.querySelector("#map");
    const weatherContainer = document.querySelector("#weather-container");
    const homeLngLat = {lng: -79.14397251288815, lat: 37.410942615370175};

    // render map-------------------------------------------------------------------
    mapboxgl.accessToken = MB_KEY;
    const coordinates = document.getElementById('coordinates');
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/satellite-streets-v12',
        center: [homeLngLat.lng, homeLngLat.lat],
        zoom: 3
    });

    // render weather---------------------------------------------------------------
    function getWeather(coords) {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${coords.lat}&lon=${coords.lng}&appid=${OW_KEY}`)
            .then(data => data.json())
            .then(currentWeather => renderWeather(currentWeather));
    }

    function renderWeather(weather) {
        console.log(weather);
        const weatherCards = document.createElement("div");
        const weatherCard = document.createElement("div");
        const forecast = document.createElement("h3");
        const icon = document.createElement("img");
        weatherCards.classList = "d-md-flex";
        weatherCards.appendChild(weatherCard);
        weatherContainer.appendChild(weatherCards);
    }

    const marker = new mapboxgl.Marker({
        draggable: true
    })
        .setLngLat([homeLngLat.lng, homeLngLat.lat])
        .addTo(map);

    // Sets coords on map. Retrieves city, sends to be rendered---------------------
    async function onDragEnd() {
        const lngLat = marker.getLngLat();
        getWeather(lngLat);
        let city = await reverseGeocode(lngLat);
        console.log("from onDragEnd: ", city);
        coordinates.style.display = 'block';
        coordinates.innerHTML = `Longitude: ${lngLat.lng}<br />Latitude: ${lngLat.lat}`;
        renderCity(city);
    }

    function renderCity(city) {
        const currentCity = document.querySelector(".city");
        currentCity.innerText = city;
        return city;
    }

    marker.on('dragend', onDragEnd);

    map.addControl(new mapboxgl.NavigationControl());

    function geocode(search, token) {
        var baseUrl = 'https://api.mapbox.com';
        var endPoint = '/geocoding/v5/mapbox.places/';
        return fetch(`${baseUrl}${endPoint}${encodeURIComponent(search)}.json?access_token=${token}`)
            .then(res => res.json())
            .then(data => data.features[0].center);
    }

    async function reverseGeocode(coords) {
        const response = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${coords.lat}&lon=${coords.lng}&limit=5&appid=${OW_KEY}`)
            .then(resp => resp.json())
            .then(data => {
                // console.log(`From revGeocode: ${data[0].name}, ${data[0].state}`);
                return data[0];
            });
        console.log(response);
        return `${response.name}, ${response.state}`;
    }

    // async function reverseGeocode(coordinates, token) {
    //     var baseUrl = 'https://api.mapbox.com';
    //     var endPoint = '/geocoding/v5/mapbox.places/';
    //     const response = await fetch(`${baseUrl}${endPoint}${coordinates.lng},${coordinates.lat}.json?access_token=${token}`)
    //         .then(res => res.json());
    //     // console.log(response.features);
    //     let place = "";
    //     let region = "";
    //     response.features.forEach(feature => {
    //         if (feature.id.includes("place")) {
    //             place = feature.text;
    //         } else if (feature.id.includes("region")) {
    //             region = feature.text;
    //         }
    //     })
    //     return `${place}, ${region}`;
    // }

})();