const express = require("express");
const router = express.Router();
const ChallengerController = require("./challengerController");
const CheckService = require("../services/CheckService");

router.get(
  "/:fileName",
  CheckService.is_staff_or_challenger,
  ChallengerController.docShow
);
router.get("/pdf/:fileName", ChallengerController.docShowPdf);
router.get("/", CheckService.is_challenger, ChallengerController.doc);
router.put("/", CheckService.is_challenger, ChallengerController.docSave);

// router.get("/photo/:size/:fileName", ChallengerController.photoShow);

module.exports = router;
