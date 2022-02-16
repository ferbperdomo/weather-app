const router = require('express').Router()
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
            res.render('users/myplaces', {citiesData})
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

    // User
    //     .findByIdAndUpdate(id, { $push: { cities: cityName } }, { new: true })
    //     .then(updatedUser => {
    //         req.session.currentUser = updatedUser
    //         res.redirect(`/myplaces`)
    //     })
    //     .catch(err => next(err))


})

// desde el form tenemos que enviar a este endpoint el id de la ciudad para añadir a favoritos
// en este endpoint lo que queremos es añadir esa ciudad a las cities del user
// 
// una vez ese user tenga esa city en favs
// en el perfil del user quieres mostrar los datos del tiempo de esas ciudades favoritas
// es decir, en ese endpoint donde queires mostrar los datos del tiempo d elos favs
// vas a tener que gestionar llamadas a la api
// primero sacas los favoritos del current user y luego llamas a la api para que te muestre el tiempo de esos favs

router.get('/eachplace/:cityName', (req, res, next) => {

    const { cityName } = req.params

    weatherApi
        .getForecast

    res.render('users/eachplace', { cityName })
})

router.get('/suggestions', (req, res, next) => {
    res.render('users/suggestions')
})

module.exports = router 