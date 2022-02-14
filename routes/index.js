module.exports = app => {

  const indexRouter = require("./index.routes");
  app.use("/", indexRouter);

  const userRouter = require("./users.routes");
  app.use("/places", userRouter)

  const apiRouter = require("./api.routes");
  app.use("/api", apiRouter)

  const authRouter = require("./auth.routes")
  app.use("/auth", authRouter)

}
