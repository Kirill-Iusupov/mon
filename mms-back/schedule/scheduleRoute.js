const express = require("express");
const router = express.Router();
const ScheduleController = require("./scheduleController");
const CheckService = require("../services/CheckService");

router.get("/", CheckService.isAdminToken, ScheduleController.list);
router.put(
  "/",
  CheckService.isAdminToken,
  ScheduleController.scheduleInsert
);
router.post(
  "/",
  CheckService.isAdminToken,
  ScheduleController.scheduleUpdate
);
router.delete(
  "/",
  CheckService.isAdminToken,
  ScheduleController.scheduleDelete
);

module.exports = router;
