const router = require("express").Router()
const bcryptjs = require('bcryptjs')

const User = require("./../models/User.model")
const saltRounds = 10

// Sign-up form
router.get("/sign-up", (req, res, next) => res.render("auth/signup-form"))

router.post("/sign-up", (req, res, next) => {

    const { username, email, userPwd } = req.body

    bcryptjs
        .genSalt(saltRounds)
        .then(salt => bcryptjs.hash(userPwd, salt))
        .then(hashedPassword => User.create({ username, email, password: hashedPassword }))
        .then(() => res.redirect("/"))
        .catch(error => next(error))
})

// Log-in form
router.get("/login", (req, res, next) => res.render('auth/login-form'))

router.post("/login", (req, res, next) => {

    const { email, userPwd } = req.body

    if (email.length === 0 || userPwd.length === 0) {
        res.render('auth/login-form', { errorMessage: 'Please, enter both fields' })
        return
    }

    User
        .findOne({ email })
        .then(user => {

            if (!user) {
                res.render('auth/login-form', { errorMessage: 'Email not found in database' })
                return

            } else if (bcryptjs.compareSync(userPwd, user.password) === false) {
                res.render('auth/login-form', { errorMessage: 'Incorrect password' })
                return

            } else {
                req.session.currentUser = user
                res.redirect('/')
            }
        })
        .catch(error => next(error))
})

// Logout
router.post('/logout', (req, res) => {

    req.session.destroy(() => res.redirect('/'))
})

module.exports = router