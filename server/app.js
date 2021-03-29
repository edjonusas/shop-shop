const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const router = require("./router/router");
require("dotenv").config({ path: "../.env" });

const port = 3000;
const host = "localhost";

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// SESSION
app.use(
  session({
    // cookie: {
    //     maxAge:30 * 60 * 1000,
    //     httpOnly: true
    // },
    secret: process.env.SESSION_KEY,
    saveUninitialized: false,
    resave: false
  })
);
app.listen(port);
console.log("Server Listening To Port " + port);

// MONGOOSE CONNECTION SET START PAGE GAMES
{
  mongoose
    .connect(process.env.MONGO_KEY, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    })
    .then(
      () => {
        console.log("Connection to MongoDB is ok");
        // db.counterCheck()
      },
      err => {
        console.log("Connection to MongoDb failed" + err);
      }
    );
}

app.use(["/"], router);
module.exports = app;
