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
    getCoords()
}

function getCoords() {

    navigator.geolocation.getCurrentPosition(
        geolocationDetails => centerMap(geolocationDetails),
        errorDetails => console.log('error --->', errorDetails)
    )
}

function centerMap() {

    const { Marker } = google.maps

    new Marker({ map, coord })
}

