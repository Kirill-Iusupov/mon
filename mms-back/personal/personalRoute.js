const express = require("express");
const router = express.Router();
const PersonalController = require("./personalController");
const CheckService = require("../services/CheckService");

router.post("/pass", CheckService.isAdminToken, PersonalController.empPassword);
router.get("/", CheckService.isAdminToken, PersonalController.list);
router.put("/", CheckService.isAdminToken, PersonalController.empInsert);
router.post("/", CheckService.isAdminToken, PersonalController.empUpdate);
router.delete("/", CheckService.isAdminToken, PersonalController.empDelete);

module.exports = router;
