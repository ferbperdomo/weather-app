const router = require('express').Router()

router.get('/myplaces', (req, res, next) => {
    res.render('users/myplaces')
})

router.get('/eachplace', (req, res, next) => {
    res.render('users/eachplace')
})

router.get('/suggestions', (req, res, next) => {
    res.render('users/suggestions')
})
module.exports= router 