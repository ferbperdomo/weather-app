let map

function initMap() {
    const { Map } = google.maps
    map = new Map(
        document.getElementById('myMap'),
        {
            zoom: 14,
            center: { lat: coord.lat, lng: coord.lon },
            styles: mapStyles.silver

        }
    )
}


