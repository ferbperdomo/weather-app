module.exports = app => {

  const indexRouter = require("./index.routes");
  app.use("/", indexRouter);

  const userRouter = require("./places.routes");
  app.use("/places", userRouter)

  const apiRouter = require("./api.routes");
  app.use("/api", apiRouter)

}