const requestModel = require("../models/order");
const userModel = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const dptEmployeeViewRequests = async (request, response) => {
  try {
    const token = request.headers["x-access-token"];
    const user = jwt.decode(token);
    const userId = user.id;
    const data = await requestModel
      .find({ from: userId })
      .sort({ createdAt: -1 });
    response.send(data);
  } catch (err) {
    response.status(500).send("Something went wrong!");
  }
};

const dptEmployeeCreateRequest = async (request, response) => {
  const token = request.headers["x-access-token"];
  const user = jwt.decode(token);
  const userID = user.id;
  let si;
  const { tableData, grandTotal, reportName } =
    request.body.requestData;

  const doccount = await requestModel.countDocuments();

  if (doccount > 0) {
    const lastdoc = await requestModel.findOne({}).sort({ createdAt: -1 });
    si = lastdoc.si + 1;
  } else {
    si = 1;
  }

  try {
    const userdoc = await userModel.findById(userID);

    const isValid = tableData.every((item) => {
      return (
        item.name &&
        item.description &&
        item.type &&
        item.cost &&
        !isNaN(parseFloat(item.cost))
      );
    });
    if (!isValid && !grandTotal && !reportName) {
      return response.json({
        status: "failed",
        message: "All fields required and must be in correct format!",
      });
    } else {
      const addrequest = await requestModel.create({
        si: si,
        requests: [...tableData],
        reportName: reportName,
        grandTotal: grandTotal,
        from: userID,
        fromUser: userdoc.username
      });
      if (addrequest) {
        return response.json({
          status: "ok",
          message: "Report Added Successfully",
        });
      }
      else {
        return response.json({
          status: "failed",
          message: "Something went wrong! Try again",
        });
      }
    }
  } catch (error) {
    console.log(error);
    return response.json({
      status: "failed",
      message: "Something went wrong! Try again",
    });
  }
};

// const dptEmployeeStatistics = async (request, response) => {
//   const token = request.headers["x-access-token"];
//   const user = jwt.decode(token);
//   const userId = user.id;

//   try {
//     const requestCount = await requestModel.countDocuments({ from: userId });
//     const requestPendingCount = await requestModel.countDocuments({
//       from: userId,
//       $or: [{ tracking: "" }, { tracking: { $exists: false } }],
//     });
//     const requestApprovedCount = await requestModel.countDocuments({
//       from: userId,
//       tracking: { $ne: null },
//     });
//     const requestVerifiedCount = await requestModel.countDocuments({
//       from: userId,
//       tracking: "phverified",
//     });
//     const requestCompletedCount = await requestModel.countDocuments({
//       from: userId,
//       tracking: "definished",
//     });
//     response.json({
//       status: "success",
//       requestPendingCount: requestPendingCount,
//       requestApprovedCount: requestApprovedCount,
//       requestVerifiedCount: requestVerifiedCount,
//       requestCompletedCount: requestCompletedCount,
//       requestCount: requestCount,
//     });
//   } catch (error) {
//     return response.json({
//       status: "failed",
//       message: "Something went wrong! Try again",
//     });
//   }
// };

const dptEmployeeFinishRequest = async (request, response) => {
  const { id } = request.body;
  try {
    updatedTracking = await requestModel.findByIdAndDelete(id);
    return response.json({
      status: "success",
      message: "Request Removed successfully",
    });
  } catch (error) {
    return response.json({
      status: "failed",
      message: "Something went wrong! Try again",
    });
  }
};

module.exports = {
  dptEmployeeViewRequests,
  dptEmployeeCreateRequest,
  dptEmployeeFinishRequest,
  // dptEmployeeStatistics
};
