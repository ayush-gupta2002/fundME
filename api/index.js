const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const campaignRoute = require("./routes/campaign");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const reviewRoute = require("./routes/review");
const categoryRoute = require("./routes/category");
const expressSession = require("express-session");
const passport = require("passport");
const localStrategy = require("passport-local");
const MongoStore = require("connect-mongo");
const stripeRoute = require("./routes/stripe");
const cors = require("cors");
const User = require("./models/User");
const bodyParser = require("body-parser");

app.use(bodyParser());

dotenv.config();

const store = MongoStore.create({
  mongoUrl: process.env.MONGO_URL,
  secret: process.env.SECRET,
  touchAfter: 24 * 60 * 60,
});

store.on("error", function (e) {
  console.log("SESSION STORE ERROR", e);
});
const sessionConfig = {
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URL }),
  name: "session",
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    // secure: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB Connection Successful");
  })
  .catch((err) => {
    console.log(err);
  });
app.use(expressSession(sessionConfig));
app.use(passport.session());
app.use(passport.initialize());
passport.use(new localStrategy(User.authenticate()));

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(expressSession(sessionConfig));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", (req, res) => {
  res.send("Home");
});

app.use(cors());

app.use("/api/users", userRoute);

app.use("/api/auth", cors(), authRoute);

app.use("/api/campaigns", campaignRoute);

app.use("/api/carts", cartRoute);

app.use("/api/orders", orderRoute);

app.use("/api/reviews", reviewRoute);

app.use("/api/payments", cors(), stripeRoute);

app.use("/api/categories", categoryRoute);

app.get("/api/test", () => {
  console.log("test is successful");
  res.send("Done");
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Listening on Port 3000");
});
