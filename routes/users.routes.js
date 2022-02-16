const router = require('express').Router()
const { isLoggedIn } = require('../middlewares/route-guard')


router.get('/myplaces', isLoggedIn, (req, res, next) => {
    res.render('users/myplaces')
})

router.post('/myplaces', (req, res, next) => {
    const { cityName } = req.params
    const { id } = req.params

    User
        .findByIdAndUpdate(id, { cityName }, { new: true })
        .then(() => res.redirect(`/myplaces`))
        .catch(err => next(err))

})

// desde el form tenemos que enviar a este endpoint el id de la ciudad para añadir a favoritos
// en este endpoint lo que queremos es añadir esa ciudad a las cities del user
// 
// una vez ese user tenga esa city en favs
// en el perfil del user quieres mostrar los datos del tiempo de esas ciudades favoritas
// es decir, en ese endpoint donde queires mostrar los datos del tiempo d elos favs
// vas a tener que gestionar llamadas a la api
// primero sacas los favoritos del current user y luego llamas a la api para que te muestre el tiempo de esos favs

router.get('/eachplace', (req, res, next) => {
    res.render('users/eachplace')
})

router.get('/suggestions', (req, res, next) => {
    res.render('users/suggestions')
})
module.exports = router 