const express = require("express");
const { check } = require("express-validator");

const placeController = require("../controllers/place-controller");
const fileUpload = require("../file-upload");

const router = express.Router(); //http://localhost:5000/api/places/

//show all places
router.get("/", placeController.getPlaces);
router.get("/:pid", placeController.getPlaceById);

//create new place
router.post(
  "/",
  fileUpload.single("image"),
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("address").not().isEmpty(),
  ],
  placeController.createPlace
);

//update place
router.patch(
  "/:pid",
  check("title").not().isEmpty(),
  check("description").isLength({ min: 5 }),
  placeController.updatePlace
);

//delete place
router.delete("/:pid", placeController.deletePlace);

module.exports = router;
