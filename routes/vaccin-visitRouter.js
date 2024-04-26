const express = require("express");
const visitController = require("./../controllers/vaccin-visitConroller");
const authMiddlewers = require("./../middlewares/authMiddlewers");

const router = express.Router();
router.use(authMiddlewers.protect);
router
  .route("/")
  .get(visitController.getAllvisit)
  .post(
    authMiddlewers.restrictTo("Nurse", "admin"),
    visitController.createvisit
  );
router
  .route("/:id")
  .get(visitController.getvisit)
  .patch(
    authMiddlewers.restrictTo("Nurse", "admin"),
    visitController.updatevisit
  )
  .delete(
    authMiddlewers.restrictTo("Nurse", "admin"),
    visitController.deletevisit
  );
module.exports = router;
