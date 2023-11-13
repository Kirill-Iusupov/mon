const express = require("express");
const router = express.Router();
const ChallengerController = require("./challengerController");
const CheckService = require("../services/CheckService");

router.get("/", CheckService.is_challenger, ChallengerController.university);
router.put(
  "/",
  CheckService.is_challenger,
  ChallengerController.universitySave
);

module.exports = router;
