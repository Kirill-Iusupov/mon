const express = require("express");

const router = express.Router();

const SharedController = require("./sharedController");

router.get("/date", SharedController.dateEnd);
router.get("/region", SharedController.region);
router.get("/district", SharedController.district);
router.get("/education", SharedController.education);
router.get("/direction", SharedController.direction);
router.get("/status", SharedController.status);

module.exports = router;
