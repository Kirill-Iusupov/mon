const express = require("express");
const router = express.Router();
const ChallengerController = require("./challengerController");
const CheckService = require("../services/CheckService");

router.get("/", CheckService.is_challenger, ChallengerController.info);
router.post("/", CheckService.is_challenger, ChallengerController.infoSave);

module.exports = router;
