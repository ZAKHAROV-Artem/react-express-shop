require("dotenv").config();

const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const ApiError = require("./error/ApiError");
const models = require("./models/models");
const sequalize = require("./db");
const path = require("path");
const router = require("./routes/index");
const errorHandler = require("./middleware/ErrorHandler");

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static")));
app.use(fileUpload());
app.use("/api", router);

app.use(errorHandler);

const start = async () => {
  try {
    await sequalize.authenticate();
    await sequalize.sync();
    app.listen(PORT, () => {
      console.log("App has started succesfully at the port " + PORT);
    });
  } catch (err) {
    console.log(err);
  }
};
start();
