"use strict";

(() => {
    const mapContainer = document.querySelector("#map");
    // render map------------------------------------------------------------------
    mapboxgl.accessToken = MB_KEY;
    const coordinates = document.getElementById('coordinates');
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/satellite-streets-v12',
        center: [-79.1, 37.4],
        zoom: 3
    });

    const marker = new mapboxgl.Marker({
        draggable: true
    })
        .setLngLat([-79.1, 37.4])
        .addTo(map);

    async function onDragEnd() {
        const lngLat = marker.getLngLat();
        let city = await reverseGeocode(lngLat, MB_KEY);
        coordinates.style.display = 'block';
        coordinates.innerHTML = `Longitude: ${lngLat.lng}<br />Latitude: ${lngLat.lat}`;
        renderCity(city);
    }

    function renderCity(city) {
        let currentCity = document.querySelector(".city");
        currentCity.innerText = city;
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
        return `${response.features[2].text}, ${response.features[4].text}`;
    }

})();