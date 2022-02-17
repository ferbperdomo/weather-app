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
            console.log(response.data.list)
            res.render('users/eachplace', response.data.list)
            // const weatherIntervals = response.data.list.map(interval => {

            //     const formattedDate = interval.dt_text

            //     return {
            //         main: interval.main,
            //         weather: interval.weather,
            //         wind: interval.wind,
            //         date: formattedDate
            //     }
            // })
            // res.render('users/eachplace', { weatherIntervals })
            // console.log(response.data.list[0])
        })


        .catch(err => console.log(err))
})

router.get('/suggestions', (req, res, next) => {
    res.render('users/suggestions')
})

module.exports = router 