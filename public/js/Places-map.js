let map

function initMap() {
    drawMap()
    getCoords()
}

function drawMap(coord) {
    const { Map } = google.maps

    map = new Map(
        document.getElementById('myMap'),
        {
            zoom: 14,
            center: { lat: 40.4165, lng: -3.7026 }
        }
    )

    getCoords(coord)
}


function getCoords() {
    console.log('en places coord---->:', coord)
    console.log('en places lat---->:', coord.lat)
    console.log('en places lon---->:', coord.lon)
    const { Map } = google.maps

    map = new Map(
        document.getElementById('newMap'),
        {
            zoom: 14,
            center: { lat: coord.lat, lng: coord.lon }
        }
    )

}


// function centerMap(geolocationDetails) {

//     const { latitude, longitude } = geolocationDetails.coords
//     const position = { lat: latitude, lng: longitude }
//     const { Marker } = google.maps

//     map.setCenter(position)

//     new Marker({ map, position })
// }

// function printMarkers(places) {
//     const { Marker } = google.maps

//     places.forEach(elm => {
//         new Marker({
//             map,
//             position: {
//                 lat: elm.location.coordinates[0],
//                 lng: elm.location.coordinates[1]
//             }
//         })
//     })
// }