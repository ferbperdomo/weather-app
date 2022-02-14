let map

function initMap() {
    drawMap()
    // getPlaces()
    getCoords()
}

function drawMap() {
    const {Map} = google.maps

    map = new Map(
        document.getElementById('myMap'),
        {
            zoom: 15,
            center: {lat: 40.425327067425776, lng: -3.7176838060373063}
        }
    )
}

// function getPlaces() {
//     axios.get('/api/places')
//     .then(response => printMarkers(response.data))
//     .catch(err => console.log(err))
// }

function getCoords() {

    navigator.geolocation.getCurrentPosition(
        geolocationDetails => centerMap(geolocationDetails),
        errorDetails => console.log('fallo --->', errorDetails)
    )
}


function centerMap(geolocationDetails) {

    const { latitude, longitude } = geolocationDetails.coords
    const position = { lat: latitude, lng: longitude }
    const { Marker } = google.maps

    map.setCenter(position)

    new Marker({ map, position })
}

function printMarkers(places) {
    const {Marker} = google.maps

    places.forEach(elm => {
        new Marker({
            map,
            position: {
                lat: elm.location.coordinates[0],
                lng: elm.location.coordinates[1]
            }
        })
    })
}