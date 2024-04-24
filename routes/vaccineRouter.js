const express = require("express");
const vaccineController = require("./../controllers/vaccineConroller");
const authMiddlewers = require("./../middlewares/authMiddlewers");
const dynamicMiddleware = require("./../middlewares/dynamicMiddleware");
const router = express.Router();
router.use(authMiddlewers.protect);
router.route("/remamber").get(vaccineController.remamber);
router
  .route("/")
  .get(vaccineController.getAllvaccine)
  .post(authMiddlewers.restrictTo("Nurse"), vaccineController.createvaccine);
router.route("/getmyvaccin").get(vaccineController.getmyvaccin);
router
  .route("/:id")
  .get(vaccineController.getvaccine)
  .patch(authMiddlewers.restrictTo("Nurse"), vaccineController.updatevaccine)
  .delete(authMiddlewers.restrictTo("Nurse"), vaccineController.deletevaccine);
module.exports = router;
