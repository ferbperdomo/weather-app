module.exports = app => {

  const indexRouter = require("./index.routes");
  app.use("/", indexRouter);

  const userRouter = require("./users.routes");
  app.use("/", userRouter)

  const authRouter = require("./auth.routes")
  app.use("/", authRouter)

}
