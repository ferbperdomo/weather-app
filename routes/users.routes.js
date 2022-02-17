const router = require('express').Router()
const { response } = require('express')
const { isLoggedIn } = require('../middlewares/route-guard')
const User = require("../models/User.model")
var d2d = require('degrees-to-direction')

const weatherHandler = require('./../services/weather-handler')


router.get('/myplaces', isLoggedIn, (req, res, next) => {
    const { cities } = req.session.currentUser
    const weatherApi = new weatherHandler()

    weatherApi
        .getAllCitiesInfo(cities)
        .then(response => {
            const citiesData = response.map(eachCityInfo => eachCityInfo.data)
            const formattedTemp = citiesData.map(eachCityTemp => {

            })
            res.render('users/myplaces', { citiesData })
        })
        .catch(err => console.log(err))

})

router.post('/myplaces/:cityName', (req, res, next) => {
    const { cityName } = req.params
    const id = req.session.currentUser._id
    console.log('ESTE ES EL ID', req.session.currentUser._id)
    // if (req.session.currentUser) {
    //     if (cityName != cityName)
    //         res.render('index', { errorMessage: 'This city is already your favorite' })
    //     console.log('ENTRA EN ESTE')
    //     return
    // } else {
    User
        .findByIdAndUpdate(id, { $push: { cities: cityName } }, { new: true })
        .then(updatedUser => {
            req.session.currentUser = updatedUser
            res.redirect('/myplaces')
        })
        .catch(err => next(err))
    // }
})


router.get('/eachplace/:cityName', (req, res, next) => {

    const { cityName } = req.params
    const weatherApi = new weatherHandler()


    weatherApi
        .getForecast(cityName)

        .then((response) => {

            const weatherIntervals = response.data.list.map(interval => {
                const formattedDate = `${interval.dt_txt.substring(8, 10)}-${interval.dt_txt.substring(5, 7)}`
                const formattedTemp = Math.round(interval.main.temp)
                const formattedMaxTemp = Math.round(interval.main.temp_max)
                const formattedMinTemp = Math.round(interval.main.temp_min)



                return {
                    main: interval.main,
                    temp: formattedTemp,
                    maxTemp: formattedMaxTemp,
                    minTemp: formattedMinTemp,
                    description: interval.weather[0].description,
                    wind: interval.wind,
                    date: formattedDate,

                    iconUrl: `https://openweathermap.org/img/wn/${interval.weather[0].icon}@2x.png`,
                    iconUrl8: `https://openweathermap.org/img/wn/${interval.weather[0].icon}@2x.png`,
                    iconUrl16: `https://openweathermap.org/img/wn/${interval.weather[0].icon}@2x.png`,
                    iconUrl24: `https://openweathermap.org/img/wn/${interval.weather[0].icon}@2x.png`,
                    iconUrl32: `https://openweathermap.org/img/wn/${interval.weather[0].icon}@2x.png`,
                }
            })
            res.render('users/eachplace', { weatherIntervals, cityName })
            console.log(weatherIntervals[0].wind)

        })


        .catch(err => console.log(err))
})

router.get('/suggestions', (req, res, next) => {
    res.render('users/suggestions')
})

module.exports = router 