const router = require('express').Router()
const { response } = require('express')
const { isLoggedIn } = require('../middlewares/route-guard')
const User = require("../models/User.model")

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
            console.log(citiesData)
        })
        .catch(err => console.log(err))

})

router.post('/myplaces/:cityName', (req, res, next) => {
    const { cityName } = req.params
    const id = req.session.currentUser._id
    console.log('ESTE ES EL ID', req.session.currentUser._id)
    if (req.session.currentUser) {
        if (cityName != cityName)
            res.render('index', { errorMessage: 'This city is already your favorite' })
        console.log('ENTRA EN ESTE')
        return
    } else {
        User
            .findByIdAndUpdate(id, { $push: { cities: cityName } }, { new: true })
            .then(updatedUser => {
                req.session.currentUser = updatedUser
                res.redirect('/myplaces')
            })
            .catch(err => next(err))
    }
})


router.get('/eachplace/:cityName', (req, res, next) => {

    const { cityName } = req.params
    const weatherApi = new weatherHandler()


    weatherApi
        .getForecast(cityName)

        .then((response) => {
            //console.log(response.data.list)
            //res.render('users/eachplace', response.data.list)

            const weatherIntervals = response.data.list.map(interval => {
                const formattedDate = `${interval.dt_txt.substring(8, 10)}-${interval.dt_txt.substring(5, 7)}`
                const formattedTemp = Math.round(interval.main.temp)
                const formattedMaxTemp = Math.round(interval.main.temp_max)
                const formattedMinTemp = Math.round(interval.main.temp_min)

                return {
                    // name: cityName,
                    main: interval.main,
                    temp: formattedTemp,
                    maxTemp: formattedMaxTemp,
                    minTemp: formattedMinTemp,
                    weather: interval.weather[0].description,
                    wind: interval.wind,
                    date: formattedDate

                }
            })
            res.render('users/eachplace', weatherIntervals)
            // console.log("MAIN ->", main)
            // console.log("temp ->", temp)
            console.log(weatherIntervals)
            console.log(weatherIntervals[0].weather[0].description)


        })


        .catch(err => console.log(err))
})

router.get('/suggestions', (req, res, next) => {
    res.render('users/suggestions')
})

module.exports = router 