"use strict";

(() => {
    const mapContainer = document.querySelector("#map");
    // render map------------------------------------------------------------------
    mapboxgl.accessToken = MB_KEY;
    var map = new mapboxgl.Map({
        container: mapContainer,
        style: 'mapbox://styles/mapbox/streets-v11'
    });

    map.addControl(new mapboxgl.NavigationControl());
})();