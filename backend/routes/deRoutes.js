const express = require("express");
const { verifyUser } = require("../middleware/verify");
const {
  dptEmployeeViewRequests,
  dptEmployeeCreateRequest,
  dptEmployeeFinishRequest,
  // dptEmployeeStatistics,
  // dptEmployeegetTracking,
} = require("../controller/deController");

const router = express.Router();

router.get("/requests", verifyUser, dptEmployeeViewRequests);

router.post("/addrequest", verifyUser, dptEmployeeCreateRequest);
router.post("/remove-request", verifyUser, dptEmployeeFinishRequest);
// router.get("/statistics", verifyUser, dptEmployeeStatistics);
// router.get("/get-tracking", verifyUser, dptEmployeegetTracking);


module.exports = router;
