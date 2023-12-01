"use strict";

(() => {
    const mapContainer = document.querySelector("#map");
    const weatherContainer = document.querySelector("#weather-container");
    const homeLngLat = {lng: -79.14397251288815, lat: 37.410942615370175};
    let weatherObj = {
        dt: 0, // dt
        high: 0, // main.temp_max
        low: 0, // main.temp_min
        feelsLike: 0, // main.feels_like
        rain: 0, // main.rain.3h
        humidity: 0, // main.humidity
        description: "", // weather[0].main
        subDescription: "", // weather[0].description
        icon: "", // weather[0].icon
        windSpeed: 0, // wind[0].speed
        windDir: 0 // wind[0].deg
    };

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
            .then(currentWeather => constructWeatherObj(currentWeather));
    }

    getWeather(homeLngLat);

    function kelvinToFahrenheit(num) {

    }

    async function constructWeatherObj(data) {
        const response = await data.list;
        console.log(response);
        for (let i = 0; i < response.length; i += 8) {
            weatherObj = {
                dt: response[i].dt,
                high: response[i].main.temp_max,
                low: response[i].main.temp_min,
                feelsLike: response[i].main.feels_like,
                rain: response[i].rain, // **
                humidity: response[i].main.humidity,
                description: response[i].weather[0].main,
                subDescription: response[i].weather[0].description,
                icon: response[i].weather[0].icon,
                windSpeed: response[i].wind.speed,
                windDir: response[i].wind.deg
            };
        }
        renderWeather(weatherObj)
    }

    function renderWeather(weatherObj) {
        console.log(weatherObj);
        const weatherCardContainer = document.createElement("div");
        const weatherCard = document.createElement("div");
        const forecast = document.createElement("h3");
        const icon = document.createElement("img");
        weatherCardContainer.classList = "d-md-flex";
        weatherContainer.appendChild(weatherCardContainer);
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
        coordinates.classList.add("d-none", "d-md-block");
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
                return data[0];
            });
        return `${response.name}, ${response.state}`;
    }
})();