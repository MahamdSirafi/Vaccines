const express = require('express');
const center_vacciController = require('./../controllers/center-vaccConroller');
const authMiddlewers=require('./../middlewares/authMiddlewers')

const router = express.Router();
router.use(authMiddlewers.protect);
router
  .route("/")
  .get(center_vacciController.getAllcenter_vacci)
  .post(
    authMiddlewers.restrictTo("admin","Nurse","mgr"),
  center_vacciController.createCenter_vacci
  );
router
  .route("/:id")
  .get()
  .patch(
    authMiddlewers.restrictTo("admin","Nurse","mgr"),
center_vacciController.updateCenter_vacci
  )
  .delete(
    authMiddlewers.restrictTo("admin","Nurse","mgr"),  
center_vacciController.deleteCenter_vacci
  );
  module.exports = router;
