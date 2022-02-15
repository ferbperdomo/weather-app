// // const FORECAST = new ApiHandler

// const forecastList = document.querySelector(".forecast-section .forecasts")

// API
//     .getForecast(cityName)
//     // console.log("API FORECAST--------------------->", cityName)
//     .then(response => {
//         const { main, weather, dt_txt, wind } = response.data
//         console.log(response.data)
//         const li = document.createElement("li")
//         li.classList.add("forecast")
//         const forecastText = `

//       <div class= "row card align-items-center justify-content-around" style="border-radius: 25px">

//           <div class="col-4">
//             <div class="city-date">${dt_txt}</div>
//             <figure>
//                 <img class="city-icon" src="${icon}" alt="${weather[0]["description"]}">
//             </figure>
//             <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
//           </div>

//           <div class="col-4 align-items-center">
//              <div class="city-date">${dt_txt}</div>
//             <figure>
//                 <img class="city-icon" src="${icon}" alt="${weather[0]["description"]}">
//             </figure>
//             <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
//           </div>

//           <div class="col-4 align-items-center">
//             <div class="city-date">${dt_txt}</div>
//             <figure>
//                 <img class="city-icon" src="${icon}" alt="${weather[0]["description"]}">
//             </figure>
//             <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
//           </div>

//       </div>
//       `
//         li.innerHTML = forecastText
//         li.replaceChildren(li)
//     })
//     .catch(() => {
//         console.log("forecasts info not accesed")
//     })
// // input.focus();

