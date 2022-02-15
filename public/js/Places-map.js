let map

function initMap() {
    drawMap()
    // getCoords()
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

    // getCoords(coord)
}


// function getCoords() {

//     const { Map } = google.maps

//     map = new Map(
//         document.getElementById('newMap'),
//         {
//             zoom: 14,
//             center: { lat: coord.lat, lng: coord.lon }
//         }
//     )

// }

