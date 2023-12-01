"use strict";

(() => {
    const mapContainer = document.querySelector("#map");
    const weatherContainer = document.querySelector("#weather-container");

    // render map-------------------------------------------------------------------
    mapboxgl.accessToken = MB_KEY;
    const coordinates = document.getElementById('coordinates');
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/satellite-streets-v12',
        center: [-79.1, 37.4],
        zoom: 3
    });

    // render weather---------------------------------------------------------------
    function renderWeather(coords) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?` +
            `lat=29.426825118534886&lon=-98.48948239256946` + `&appid=${OW_KEY}`)
            .then( data => data.json())
            .then( currentWeather => console.log(currentWeather));
        // let lng = coords[0];
        // let lat = coords[1];
        // fetch(`api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${OW_KEY}`)
        //     .then(resp => resp.json())
        //     .then( data => console.log(data));
    }

    const marker = new mapboxgl.Marker({
        draggable: true
    })
        .setLngLat([-79.1, 37.4])
        .addTo(map);

    // Sets coords on map. Retrieves city, sends to be rendered---------------------
    async function onDragEnd() {
        const lngLat = marker.getLngLat();
        renderWeather(lngLat);
        let city = await reverseGeocode(lngLat, MB_KEY);
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

    async function reverseGeocode(coordinates, token) {
        var baseUrl = 'https://api.mapbox.com';
        var endPoint = '/geocoding/v5/mapbox.places/';
        const response = await fetch(`${baseUrl}${endPoint}${coordinates.lng},${coordinates.lat}.json?access_token=${token}`)
            .then(res => res.json());
        // console.log(response.features);
        let place = "";
        let region = "";
        response.features.forEach(feature => {
            if (feature.id.includes("place")) {
                place = feature.text;
            } else if (feature.id.includes("region")) {
                region = feature.text;
            }
        })
        return `${place}, ${region}`;
    }

})();