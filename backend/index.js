const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

const cors = require("cors");
const deRoutes = require("./routes/deRoutes.js");
const commonRouter = require("./routes/commonRoutes.js");

const app = express();

app.use(express.json());
app.use(cors());

app.use(commonRouter);
app.use("/de", deRoutes);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4,
    authSource: "admin",
    socketTimeoutMS: 30000,
  })
  .then(() => console.log("Mongodb Connected"))
  .catch((err) => console.log(err));

const port = 5000;
app.listen(port, () => {
  console.log("server started");
});
