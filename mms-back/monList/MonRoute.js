const express = require("express");
const router = express.Router();
const MonController = require("./MonController");
const CheckService = require("../services/CheckService");

router.get("/status", CheckService.isStaffToken, MonController.status);
router.put("/status", CheckService.isMonOrAparatToken, MonController.updateStatus);
router.get("/export", CheckService.isStaffToken, MonController.export);
router.get("/", CheckService.isStaffToken, MonController.mon);

module.exports = router;
