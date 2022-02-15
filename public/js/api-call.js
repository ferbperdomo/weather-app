const API = new ApiHandler

const form = document.querySelector(".top-banner form")
const input = document.querySelector(".top-banner input")
const msg = document.querySelector(".top-banner .msg")
const list = document.querySelector(".card-section .cities")

const apiKey = "d0b31d0dac9ba0b6a85727ee3e3eb4e7"

let coord = {}

form.addEventListener("submit", e => {
    e.preventDefault();
    let inputVal = input.value;

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
            coord = response.data.coord
            const { main, name, sys, weather } = response.data
            // console.log('prueba ---->', response.data)
            // console.log('prueba1 ---->', coord.lat)
            // console.log('prueba2 ---->', coord.lon)

            const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]
                }.svg`;

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
            <img class="city-icon" src="${icon}" alt="${weather[0]["description"]
                }">
              <figcaption>${weather[0]["description"]}</figcaption>
            </figure>
          </div>
      </div>
      `;

            li.innerHTML = markup
            list.replaceChildren(li)
            drawMap(coord)
        })
        .catch(() => {
            msg.textContent = "Please search for a valid city 😩"
        });

    msg.textContent = ""
    form.reset()
    input.focus()
})
