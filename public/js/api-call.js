const API = new ApiHandler()

const form = document.querySelector(".top-banner form")
const input = document.querySelector(".top-banner input")
const msg = document.querySelector(".top-banner .msg")

// Cuerrent weather card in index view
const list = document.querySelector(".card-section .cities")

// Forecast card in index view
const forecastList = document.querySelector(".forecast-section .forecasts")

let apiKey = "d0b31d0dac9ba0b6a85727ee3e3eb4e7"

let cityName

let coord = {}

form.addEventListener("submit", e => {
    e.preventDefault();
    let inputVal = input.value

    const listItems = list.querySelectorAll(".card-section .city")
    const listItemsArray = Array.from(listItems)

    if (listItemsArray.length > 0) {
        const filteredArray = listItemsArray.filter(el => {
            let content = "";
            if (inputVal.includes(",")) {
                if (inputVal.split(",")[1].length > 2) {
                    inputVal = inputVal.split(",")[0];
                    content = el
                        .querySelector(".city-name span")
                        .textContent.toLowerCase();
                } else {
                    content = el.querySelector(".city-name").dataset.name.toLowerCase()
                }
            } else {
                content = el.querySelector(".city-name span").textContent.toLowerCase()
            }
            return content == inputVal.toLowerCase()
        });

        if (filteredArray.length > 0) {
            msg.textContent = `You already know the weather for ${filteredArray[0].querySelector(".city-name span").textContent
                } ...otherwise be more specific by providing the country code as well 😉`;
            form.reset()
            input.focus()
            return
        }
    }

    API
        .getInfo(input.value)
        .then(response => {
            cityName = response.data.name
            const { main, name, sys, weather } = response.data
            coord = response.data.coord

            let icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]
                }.svg`

            const li = document.createElement("li")
            li.classList.add("city")
            const markup = `
                <div class= "row card align-items-center justify-content-around" style="border-radius: 25px">
                    <div class="col-3">
                        <h2 class="city-name" data-name="${name}, ${sys.country}">
                        <span>${name}</span>
                        <sup>${sys.country}</sup>
                        </h2>
                        <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
                    </div>
                    <div class="col-3 align-items-center">
                        <figure>
                        <img class="city-icon" src="${icon}" alt="${weather[0]["description"]}">
                        <figcaption>${weather[0]["description"]}</figcaption>
                        </figure>
                    </div>
                    <form action="/myplaces/${cityName}" method="post">
                        <div class="d-grid d-flex justify-content-end">
                            <button class="btn btn-dark btn-sm mb-3">Add to favs</button>
                        </div>
                    </form>
                <a href="/eachplace/${cityName}" class="btn btn-dark btn-sm pruebadetails">Detailed view</a>

                </div>
                
                `
            li.innerHTML = markup
            list.replaceChildren(li)
            initMap(coord)

        })

        .then(() => {

            API
                .getForecast(cityName)
                .then(response => {
                    const eachday = response.data.list
                    console.log(eachday[0])
                    const { main, weather, dt_txt, wind } = response.data.list
                    const li = document.createElement("li")
                    li.classList.add("forecast")
                    // let weatherIcon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]
                    //     }.svg`

                    const forecastText = `

                    <div class= "row card align-items-center justify-content-around" style="border-radius: 25px">

                        <div class="col-4">
                            <div class="city-temp">T:${Math.round(eachday[8].main.temp)}<sup>°C</sup></div>
                            <div class="city-temp">S:${Math.round(eachday[8].main.feels_like)}<sup>°C</sup></div>
                        </div>

                        <div class="col-4 align-items-center">
                            <div class="city-temp">T:${Math.round(eachday[16].main.temp)}<sup>°C</sup></div>
                            <div class="city-temp">S:${Math.round(eachday[16].main.feels_like)}<sup>°C</sup></div>
                        </div>

                        <div class="col-4 align-items-center">
                            <div class="city-temp">T:${Math.round(eachday[24].main.temp)}<sup>°C</sup></div>
                            <div class="city-temp">S:${Math.round(eachday[24].main.feels_like)}<sup>°C</sup></div>
                        </div>

                    </div>
                    `
                    li.innerHTML = forecastText
                    forecastList.replaceChildren(li)

                })
                .catch(err => {
                    console.log(err)
                })
        })

        .catch(() => {
            msg.textContent = "Please search for a valid city 😩"
        });

    msg.textContent = ""
    form.reset()
    input.focus()
})

