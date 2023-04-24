const express = require("express");
const app = express();
require("dotenv").config();

const userRoute = require("./routes/user-route");
const userReflections = require("./routes/reflection-route");
const authentication = require("./middlewares/auth-middleware");
const AppError = require("./utils/app.error");
//parser middleware from JSON
const errMiddleware = require("./middlewares/err-middleware");

app.use(express.json());

app.use("/api/v1/users", userRoute);
app.use("/api/v1/reflections", authentication, userReflections);

app.all("*", (req, res, next) => {
  next(new AppError(`cant find ${req.originalUrl} on this server`, 404));
});

app.use(errMiddleware);

const port = process.env.PORT || 3000;

app.listen({ port }, () => {
  if (!(process.env.NODE_ENV === "production")) {
    console.log("server is listening to port " + port);
  }
});
