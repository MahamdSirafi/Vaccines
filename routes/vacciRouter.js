const express = require("express");
const vaciController = require("./../controllers/listvacConroller");
const authMiddlewers = require("./../middlewares/authMiddlewers");
const router = express.Router();
router.use(authMiddlewers.protect);
router
  .route("/")
  .get(vaciController.getAllvacci)
  .post(authMiddlewers.restrictTo("admin"), vaciController.createvacci);
router
  .route("/:id")
  .get(vaciController.getvacci)
  .patch(authMiddlewers.restrictTo("admin"), vaciController.updatevacci)
  .delete(authMiddlewers.restrictTo("admin"), vaciController.deletevacci);
module.exports = router;
