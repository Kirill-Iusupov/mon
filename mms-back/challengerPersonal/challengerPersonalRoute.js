const express = require("express");
const router = express.Router();
const ChallengerController = require("./challengerPersonalController");
const CheckService = require("../services/CheckService");

router.post("/fill", CheckService.is_challenger, ChallengerController.dataFill);
router.get("/detail", CheckService.is_challenger, ChallengerController.detail);
router.post(
  "/detail",
  CheckService.is_challenger,
  ChallengerController.detailSave
);

// router.post(
//   "/password",
//   CheckService.is_challenger,
//   ChallengerController.password
// ); // ???
router.post("/photo", CheckService.is_challenger, ChallengerController.photo);
router.get("/photo/:size/:fileName", ChallengerController.photoShow);

module.exports = router;
