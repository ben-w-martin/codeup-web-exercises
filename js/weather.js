"use strict";

(() => {
    const mapContainer = document.querySelector("#map");
    // render map------------------------------------------------------------------
    mapboxgl.accessToken = MB_KEY;
    const coordinates = document.getElementById('coordinates');
    var map = new mapboxgl.Map({
        container: mapContainer,
        style: 'mapbox://styles/mapbox/streets-v11'
    });

    map.addControl(new mapboxgl.NavigationControl());

    function geocode(search, token) {
        var baseUrl = 'https://api.mapbox.com';
        var endPoint = '/geocoding/v5/mapbox.places/';
        return fetch(`${baseUrl}${endPoint}${encodeURIComponent(search)}.json?access_token=${token}`)
            .then( res => res.json() )
            // to get all the data from the request, comment out the following three lines...
            .then( data => data.features[0].center);
    }

    function reverseGeocode(coordinates, token) {
        var baseUrl = 'https://api.mapbox.com';
        var endPoint = '/geocoding/v5/mapbox.places/';
        return fetch(`${baseUrl}${endPoint}${coordinates.lng},${coordinates.lat}.json?access_token=${token}`)
            .then( res => res.json() )
            // to get all the data from the request, comment out the following three lines...
            .then( data => data.features[0].place_name );
    }

    const marker = new mapboxgl.Marker({
        draggable: true
    })
        .setLngLat([0, 0])
        .addTo(map);

    function onDragEnd() {
        const lngLat = marker.getLngLat();
        coordinates.style.display = 'block';
        coordinates.innerHTML = `Longitude: ${lngLat.lng}<br />Latitude: ${lngLat.lat}`;
    }

    marker.on('dragend', onDragEnd);
})();