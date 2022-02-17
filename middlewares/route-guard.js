const isLoggedIn = (req, res, next) => {
    req.session.currentUser ? next() : res.render('auth/login-form', {
        errorMessage: 'You need to be a user 😩. Register 😉'
    })
}

const isLoggedOut = (req, res, next) => {
    req.session.currentUser ? res.redirect('/') : next()
}
module.exports = { isLoggedIn, isLoggedOut }
