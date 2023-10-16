const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const placeRoutes = require("./routes/place-routes");
const HttpError = require("./models/http-error");

const app = express();

app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));

//CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  next();
});

app.use("/api/places", placeRoutes); //api necessary?

//error
app.use((req, res, next) => {
  const error = new HttpError("Wrong route.", 404);
  throw error;
});

app.use((err, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }

  if (res.headerSent) {
    return next(err);
  }

  res.status(err.code || 500);
  res.json({ message: err.message || "Unknown error" });
});

//connect to DB
mongoose
  .connect(
    "mongodb+srv://goeunpark21:7dnNvfFyvD5EK1Rc@cluster0.au2vqpa.mongodb.net/TravelGuide?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to database!");
    app.listen(5000);
  })
  .catch((error) => {
    console.log(error);
  });
