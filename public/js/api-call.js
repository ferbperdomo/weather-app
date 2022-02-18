const API = new ApiHandler()
const form = document.querySelector(".top-banner form")
const input = document.querySelector(".top-banner input")
const msg = document.querySelector(".top-banner .msg")
const mapSection = document.getElementById('myMap')
const indexMsg = document.getElementById('overlay')

// Cuerrent weather card in index view
const list = document.querySelector(".card-section .cities")

// Forecast card in index view
const forecastList = document.querySelector(".forecast-section .forecasts")

let cityName

let coord = {}

form.addEventListener("submit", e => {
    e.preventDefault();

    mapSection.classList.remove('not-show')
    indexMsg.classList.remove('show')
    indexMsg.classList.add('not-show')


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
                <div class= "row card align-items-center justify-content-around" style="border-radius: 5px">
                    <div class="col-4 text-center">
                        <h2 class="city-name" data-name="${name}, ${sys.country}">
                        <span>${name}</span>
                        <sup>${sys.country}</sup>
                        </h2>
                        <span class="city-temp">${Math.round(main.temp)}<sup>°C</sup></span>
                    </div>
                    <div class="col-4 text-center">
                        <figure>
                        <img class="city-icon" src="${icon}" alt="${weather[0]["description"]}">
                        <figcaption class="figcaption">${weather[0]["description"]}</figcaption>
                        </figure>
                    </div>
                    <form action="/myplaces/${cityName}" method="post">
                        <div class="d-grid d-flex justify-content-center">
                            <button class="btn btn-sm mb-3 city-feels">Add to favs</button>
                        </div>
                    </form>
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
                    const { main, weather, dt_txt, wind } = response.data.list
                    const weatherList = response.data.list
                    console.log(weatherList)
                    const li = document.createElement("li")
                    li.classList.add("forecast")

                    const eachday = response.data.list
                    const icon1 = `https://openweathermap.org/img/wn/${weatherList[8].weather[0].icon}@2x.png`;
                    const icon2 = `https://openweathermap.org/img/wn/${weatherList[16].weather[0].icon}@2x.png`;
                    const icon3 = `https://openweathermap.org/img/wn/${weatherList[24].weather[0].icon}@2x.png`;

                    const forecastText = `

                    <div class= "row card align-items-center" style="border-radius: 5px">

                        <div class="col-4 mb-3 text-center">
                        <img class="city-icon" src="${icon1}" alt="">
                        <p class="city-date">${weatherList[8].dt_txt.substring(8, 10)}-${weatherList[8].dt_txt.substring(5, 7)}<p>
                            <p class="city-temp">${Math.round(eachday[8].main.temp)}<sup>°C</sup></p>
                            <p class="city-feels">Feels like: ${Math.round(eachday[8].main.feels_like)}<sup>°C</sup></p>
                        </div>

                        <div class="col-4 mb-3 text-center ">
                        <img class="city-icon" src="${icon2}" alt="">
                        <p class="city-date">${weatherList[16].dt_txt.substring(8, 10)}-${weatherList[16].dt_txt.substring(5, 7)}<p>
                            <p class="city-temp">${Math.round(eachday[16].main.temp)}<sup>°C</sup></p>
                            <p class="city-feels">Feels like: ${Math.round(eachday[16].main.feels_like)}<sup>°C</sup></p>
                        </div>

                        <div class="col-4 mb-3 text-center">
                        <img class="city-icon" src="${icon3}" alt="">
                        <p class="city-date">${weatherList[24].dt_txt.substring(8, 10)}-${weatherList[24].dt_txt.substring(5, 7)}<p>
                            <p class="city-temp">${Math.round(eachday[24].main.temp)}<sup>°C</sup></p>
                            <p class="city-feels">Feels like: ${Math.round(eachday[24].main.feels_like)}<sup>°C</sup></p>
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

