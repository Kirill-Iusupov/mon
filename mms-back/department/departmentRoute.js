const express = require("express");
const router = express.Router();
const DepartmentController = require("./departmentController");
const CheckService = require("../services/CheckService");

router.get("/", CheckService.isAdminToken, DepartmentController.list);
router.put(
  "/",
  CheckService.isAdminToken,
  DepartmentController.departmentInsert
);
router.post(
  "/",
  CheckService.isAdminToken,
  DepartmentController.departmentUpdate
);
router.delete(
  "/",
  CheckService.isAdminToken,
  DepartmentController.departmentDelete
);

module.exports = router;
