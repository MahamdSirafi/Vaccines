const express = require("express");
const cardController = require("./../controllers/cardConroller");
const authMiddlewers = require("./../middlewares/authMiddlewers");
const dynamicMiddleware = require("./../middlewares/dynamicMiddleware");
const {
  genratorId,
  sitIdCenter,
  sitIdMotherInBody,
  sitIdMotherInQuery,
} = require("./../middlewares/cardMiddleware");
const router = express.Router();
router.use(authMiddlewers.protect);

//getAllcard
router.route("/").get(cardController.getAllcard);
router
  .route("/mother")
  .get(
    dynamicMiddleware.addQuery("card_type", "mother"),
    cardController.getAllcard
  )
  .post(
    authMiddlewers.restrictTo("mgr", "Nurse"),
    sitIdCenter,
    genratorId,
    cardController.createCard
  );
//getAllchildren
router
  .route("/children")
  .get(
    dynamicMiddleware.addQuery("card_type", "child"),
    cardController.getAllcard
  )
  .post(
    authMiddlewers.restrictTo("mgr", "Nurse"),
    sitIdMotherInBody,
    sitIdCenter,
    genratorId,
    dynamicMiddleware.addVarBody("card_type", "child"),
    cardController.createCard
  );
//getonecard
router
  .route("/mychildren")
  .get(
    authMiddlewers.restrictTo("user"),
    sitIdMotherInQuery,
    cardController.getAllcard
  );
router
  .route("/:id")
  .get(cardController.getcard)
  .patch(
    authMiddlewers.restrictTo("admin", "mgr", "Nurse"),
    cardController.updatecard
  )
  .delete(authMiddlewers.restrictTo("admin"), cardController.deletecard);

module.exports = router;
