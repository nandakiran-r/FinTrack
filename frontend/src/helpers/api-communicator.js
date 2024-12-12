import axios from "axios";
import { toast } from "react-toastify";

export const DEAddReport = async (requestData) => {
  try {
    const response = await axios.post(
      "/de/addrequest",
      {
        requestData,
      },
      {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      }
    );
    const data = await response.data;
    return data;
  } catch (error) {
    toast.error("Something went wrong!");
  }
};

export const DEViewRequests = async () => {
  try {
    const response = await axios.get("/de/requests", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });
    const data = await response.data;
    return data;
  } catch (error) {
    toast.error("Something went wrong!");
  }
};

export const DEFinishRequest = async (id) => {
  try {
    const response = await axios.post(
      "/de/remove-request",
      { id },
      {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      }
    );
    if (response) {
      return response.data;
    }
  } catch (error) {
    toast.error("Something went wrong");
  }
};

export const DEStatistics = async () => {
  try {
    const response = await axios.get("/de/statistics", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });
    const data = await response.data;

    return data;
  } catch (error) {
    toast.error("Something went wrong!");
  }
};

export const DEGetTrackingDetails = async () => {
  try {
    const response = await axios.get("de/get-tracking", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });
    if (response) {
      return await response.data;
    }
  } catch (error) {
    toast.error("Something went wrong!");
  }
};