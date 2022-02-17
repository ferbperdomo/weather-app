require("dotenv/config")

require("./db")

const express = require("express")

const app = express()

require("./config")(app)

app.locals.siteTitle = `CloudyNight`
app.locals.mapsApiKey = process.env.MAPS_API_KEY

require("./config/session.config")(app)

require("./routes")(app)

require("./error-handling")(app)

module.exports = app
