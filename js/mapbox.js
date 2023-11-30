"use strict";

(() => {
    const zoomRadios = document.querySelectorAll("#zoom-buttons input");
    const mingsAddress = "914 E Elmira St, San Antonio, TX 78212";
    let mingsCoordinates = geocode(mingsAddress, MB_KEY);
    let zoomLevel = 5;
    mapboxgl.accessToken = MB_KEY;
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v12', // style URL
        center: [-98.4916, 29.4252], // starting position [lng, lat]
        zoom: 9, // starting zoom
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

    geocode(mingsAddress, MB_KEY).then( result => {
        console.log(result);
        map.setCenter(result);
        map.setZoom(zoomLevel);
    });

    const mingsInfo = {
        address: mingsAddress,
        popupHTML: "<p>Mings:<br>World's Greatest Bao Buns</p>"
    };

    function placeMarkerAndPopup(info, token, map) {
        geocode(info.address, token).then( coords => {
            let popup = new mapboxgl.Popup()
                .setHTML(info.popupHTML);
            let marker = new mapboxgl.Marker()
                .setLngLat(coords)
                .addTo(map)
                .setPopup(popup);
            popup.addTo(map);
        });
    }

    placeMarkerAndPopup(mingsInfo, MB_KEY, map);

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
            geocode(mingsAddress, MB_KEY).then( result => {
                map.setCenter(result);
                map.setZoom(zoomLevel);
            });
        })
    })
})();