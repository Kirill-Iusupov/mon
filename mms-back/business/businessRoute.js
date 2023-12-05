const express = require("express");
const router = express.Router();
const BusinessController = require("./businessController");
const CheckService = require("../services/CheckService");

router.get("/", CheckService.isAdminToken, BusinessController.list);
router.put(
  "/",
  CheckService.isAdminToken,
  BusinessController.businessInsert
);
router.post(
  "/",
  CheckService.isAdminToken,
  BusinessController.businessUpdate
);
router.delete(
  "/",
  CheckService.isAdminToken,
  BusinessController.businessDelete
);

module.exports = router;
