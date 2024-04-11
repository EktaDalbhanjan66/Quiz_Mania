const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.join(__dirname, "../.env") });

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connection successfull");
    app.listen(process.env.PORT, () => {
      console.log("server running at", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
