const express = require("express");

const router = express.Router();

const SharedController = require("./sharedController");

router.get("/role", SharedController.role);
router.get("/department", SharedController.department);
router.get("/employee", SharedController.employee);
router.get("/post", SharedController.post);
router.get("/businessType", SharedController.businessType);
router.get("/businessTrip", SharedController.businessTrip);
router.get("/country", SharedController.country);

module.exports = router;
