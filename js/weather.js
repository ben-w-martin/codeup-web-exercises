"use strict";

(() => {
    const mapContainer = document.querySelector("#map");
    const weatherContainer = document.querySelector("#weather-container");
    const homeLngLat = {lng: -79.14397251288815, lat: 37.410942615370175};
    const search = document.querySelector("#search-bar");
    const searchBtn = document.querySelector("#search-btn");
    let weatherArr = [];

    // render map-------------------------------------------------------------------
    mapboxgl.accessToken = MB_KEY;
    const coordinates = document.getElementById('coordinates');
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [homeLngLat.lng, homeLngLat.lat],
        zoom: 3
    });

    // search bar-------------------------------------------------------------------
    async function searchBar(e) {
        e.preventDefault()
        const input = search.value;
        if (search.value !== "") {
            const lngLatArr = await geocode(input, MB_KEY);
            const lngLatObj = {lng: lngLatArr[0], lat: lngLatArr[1]}
            let city = await reverseGeocode(lngLatObj);
            marker.setLngLat(lngLatObj);
            map.flyTo({
                center: lngLatArr,
                essential: true
            });
            getWeather(lngLatObj);
            renderCity(city);
        }
    }

    searchBtn.addEventListener("click", searchBar);

    // render weather---------------------------------------------------------------
    function getWeather(coords) {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${coords.lat}&lon=${coords.lng}&appid=${OW_KEY}`)
            .then(data => data.json())
            .then(currentWeather => constructWeatherArr(currentWeather));
    }

    getWeather(homeLngLat);

    // returns array of temps at [C, F, K];
    function temperatureToggle(num) {
        let celcFahrKelvin = [];
        celcFahrKelvin.push(Math.round(num - 273.15));
        celcFahrKelvin.push(Math.round((celcFahrKelvin[0] * (9 / 5)) + 32));
        celcFahrKelvin.push(num);
        return celcFahrKelvin;
    }

    // constructs array of weather objects to be rendered
    // todo temp min needs to be lowest temp for the day. Maybe it's own function
    async function constructWeatherArr(data) {
        const response = await data.list;
        let weatherObj = {};
        weatherArr = [];
        for (let i = 0; i < response.length; i += 8) {
            weatherObj = {
                dt: response[i].dt,
                currentTemp: temperatureToggle(response[i].main.temp_max),
                low: temperatureToggle(response[i].main.temp_min),
                feelsLike: temperatureToggle(response[i].main.feels_like),
                rain: response[i].rain, // **
                humidity: response[i].main.humidity,
                description: response[i].weather[0].main,
                subDescription: response[i].weather[0].description,
                icon: response[i].weather[0].icon,
                windSpeed: response[i].wind.speed,
                windDir: response[i].wind.deg
            };
            weatherArr.push(weatherObj);
        }
        renderWeather(weatherArr);
    }

    function renderWeather(weatherArr) {
        const weatherCardContainer = document.createElement("div");
        weatherContainer.innerHTML = "";
        for (let i = 0; i < weatherArr.length; i++) {
            const current = weatherArr[i];
            const weatherCard = document.createElement("div");
            const date = document.createElement("p");
            const description = document.createElement("h3");
            const subDescription = document.createElement("p");
            const icon = document.createElement("img");
            const tempDiv = document.createElement("div");
            date.innerHTML = new Date(current.dt * 1000).toDateString();
            description.innerText = current.description;
            subDescription.innerText = current.subDescription;
            subDescription.style.fontSize = "0.8em";
            icon.src = `https://openweathermap.org/img/wn/${current.icon}@2x.png`;
            tempDiv.classList = "d-flex justify-content-between flex-wrap"
            tempDiv.innerHTML = `<p class="col-12">Currently: ${current.currentTemp[1]}</p>`
            weatherCard.appendChild(date);
            weatherCard.appendChild(description);
            weatherCard.appendChild(icon);
            weatherCard.appendChild(subDescription);
            weatherCard.appendChild(tempDiv);
            weatherCardContainer.appendChild(weatherCard);
        }
        weatherCardContainer.classList = "d-md-flex justify-content-between";
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
        map.flyTo({
            center: lngLat,
            essential: true
        });
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