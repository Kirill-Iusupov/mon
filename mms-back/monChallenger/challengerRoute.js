const express = require("express");
const router = express.Router();
const ChallengerController = require("./challengerController");
const CheckService = require("../services/CheckService");

router.get(
  "/university/:id",
  CheckService.isStaffToken,
  ChallengerController.university
);
router.post("/fill", CheckService.isStaffToken, ChallengerController.dataFill);
router.get(
  "/detail/:id",
  CheckService.isStaffToken,
  ChallengerController.detail
);
// router.post(
//   "/password",
//   CheckService.isStaffToken,
//   ChallengerController.password
// ); // ???
router.get("/photo/:size/:fileName", ChallengerController.photoShow);
router.get("/info/:id", CheckService.isStaffToken, ChallengerController.info);
router.get(
  "/file/:fileName",
  CheckService.isStaffToken,
  ChallengerController.docShow
);
router.get("/doc/:id", CheckService.isStaffToken, ChallengerController.doc);
router.get(
  "/export/:id",
  CheckService.isStaffToken,
  ChallengerController.export
);

module.exports = router;
