const mongoose = require("mongoose");
const { validationResult } = require("express-validator");

const Place = require("../models/place");
const HttpError = require("../models/http-error");
const getCoordsForAddress = require("../location");

const getPlaces = async (req, res, next) => {
  let places;

  try {
    places = await Place.find({});
  } catch (err) {
    const error = new HttpError("Fetching Failed.", 500);

    return next(error);
  }

  res.json({
    places: places.map((place) => place.toObject({ getters: true })),
  });
};

const getPlaceById = async (req, res, next) => {
  let place;
  const placeId = req.params.pid;

  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError("Could not find a place.", 500);
    return next(error);
  }

  if (!place) {
    throw new HttpError("No match for place id.", 404);
  }

  res.json({ place: place.toObject({ getters: true }) });
};

const createPlace = async (req, res, next) => {
  const { title, description, address } = req.body;
  const error = validationResult(req);

  if (!error.isEmpty()) {
    const error = new HttpError("Invalid input.", 422);
    return next(error);
  }

  let coordinates;

  try {
    coordinates = await getCoordsForAddress(address);
  } catch (error) {
    return next(error);
  }

  const createdPlace = new Place({
    title,
    description,
    address,
    location: coordinates,
    image: req.file.path,
  });

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();

    await createdPlace.save({ sassion: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError("Fail to create a place.", 500);
    return next(error);
  }

  res.status(201).json({ place: createdPlace });
};

const updatePlace = async (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    const error = new HttpError("Invalid input.", 422);

    return next(error);
  }

  const { title, description } = req.body;
  const placeId = req.params.pid;
  let place;

  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError("Something wrong with finding data!", 500);

    return next(error);
  }

  place.title = title;
  place.description = description;

  try {
    await place.save();
  } catch (err) {
    const error = new (HttpError("Something wrong with saving data!", 500))();

    return next(error);
  }

  res.status(200).json({ place: place.toObject({ getters: true }) });
};

const deletePlace = async (req, res, next) => {
  const placeId = req.params.pid;
  let place;

  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError("Something wrong with finding data!", 500);

    return next(error);
  }

  if (!place) {
    const error = new HttpError("Couldn't find a place!", 404);

    return next(error);
  }

  try {
    const s = await mongoose.startSession();
    s.startTransaction();
    await place.deleteOne({ session: s });
    await s.commitTransaction();
  } catch (err) {
    const error = new HttpError("Something wrong with deleting data!", 500);

    return next(error);
  }

  res.status(200).json({ message: "Place deleted." });
};

exports.getPlaces = getPlaces;
exports.getPlaceById = getPlaceById;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
