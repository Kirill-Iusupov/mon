const express = require("express");
const router = express.Router();
const CountryController = require("./countryController");
const CheckService = require("../services/CheckService");

router.get("/", CheckService.isAdminToken, CountryController.list);
router.put(
  "/",
  CheckService.isAdminToken,
  CountryController.countryInsert
);
router.post(
  "/",
  CheckService.isAdminToken,
  CountryController.countryUpdate
);
router.delete(
  "/",
  CheckService.isAdminToken,
  CountryController.countryDelete
);

module.exports = router;
