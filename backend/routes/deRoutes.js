const express = require("express");
const { verifyUser } = require("../middleware/verify");
const {
  dptEmployeeViewRequests,
  dptEmployeeCreateRequest,
  dptEmployeeFinishRequest,
  dptEmployeeStatistics,
} = require("../controller/deController");

const router = express.Router();

router.get("/requests", verifyUser, dptEmployeeViewRequests);

router.post("/addrequest", verifyUser, dptEmployeeCreateRequest);
router.post("/remove-request", verifyUser, dptEmployeeFinishRequest);
router.get("/statistics", verifyUser, dptEmployeeStatistics);


module.exports = router;
