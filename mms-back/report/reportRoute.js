const express = require("express");
const router = express.Router();
const ReportController = require("./reportController");
const CheckService = require("../services/CheckService");

router.get("/", CheckService.isAdminToken, ReportController.list);
router.put(
  "/",
  CheckService.isAdminToken,
  ReportController.reportInsert
);
router.post(
  "/",
  CheckService.isAdminToken,
  ReportController.reportUpdate
);
router.delete(
  "/",
  CheckService.isAdminToken,
  ReportController.reportDelete
);

module.exports = router;
