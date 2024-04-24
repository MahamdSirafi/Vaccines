const express = require("express");
const cardController = require("./../controllers/cardConroller");
const authMiddlewers = require("./../middlewares/authMiddlewers");
const dyMiddlewers = require("./../middlewares/dynamicMiddleware");
const router = express.Router();
router.use(authMiddlewers.protect);

//getAllcard
router
  .route("/")
  .get(cardController.getAllcard)
  .post(
    authMiddlewers.restrictTo("admin", "mgr", "Nurse"),
    cardController.createcardMother
  );
    //getAllchildren
  router
  .route("/children")
  .get(cardController.getAllchildcard)
  .post(
    authMiddlewers.restrictTo("admin", "mgr", "Nurse"),
    cardController.createchildren
  );
  //getonecard
  router
  .route("/mychildren")
  .get(authMiddlewers.restrictTo("user"), cardController.getmychldren);
  router
  .route("/:id")
  .get(cardController.getcard)
  .patch(authMiddlewers.restrictTo("admin"), cardController.updatecard)
  .delete(authMiddlewers.restrictTo("admin"), cardController.deletecard);



router
  .route("/mother")
  .get(
    authMiddlewers.restrictTo("admin", "mgr", "Nurse"),
    cardController.getAllm
  );

router.route("/childern/:id").get(cardController.getchildcard);


module.exports = router;
