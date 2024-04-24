const express = require('express');
const centerController = require('./../controllers/centersController');
const authMiddlewers=require('./../middlewares/authMiddlewers')

const router = express.Router();
router.use(authMiddlewers.protect);
const vacciRoutes = require("./vacciRouter");
router.use("/:centerId/vacci", vacciRoutes);
router
  .route("/")
  .get(centerController.getAllcenter)
  .post(
    authMiddlewers.restrictTo("admin"),
    centerController.createcenter
  );
router
  .route("/:id")
  .get(centerController.getcenter)
  .patch(
    authMiddlewers.restrictTo("admin"),
    centerController.updatecenter
  )
  .delete(
    authMiddlewers.restrictTo("admin"),
    centerController.deletecenter
  );
  module.exports = router;
