var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var usersRouter = require("./routes/users");
var authRouter = require("./routes/auth");
var productRouter = require("./routes/products");

var app = express();

app.set("trust proxy", 1);
app.enable("trust proxy");

app.use(logger("dev"));
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URI,
    credentials: true, // <== URL of our future React app
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/products", productRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });

module.exports = app;
