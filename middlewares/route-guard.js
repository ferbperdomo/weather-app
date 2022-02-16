const isLoggedIn = (req, res, next) => {
    req.session.currentUser ? next() : res.render('auth/login-form', {
        errorMessage: 'You need to be a user 😩. Register 😉'
    })
}
module.exports = { isLoggedIn }
