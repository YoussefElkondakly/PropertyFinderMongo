const mongoose = require("mongoose");
const app = require("./app");
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 3000;

const DB = process.env.DB_CONNECT.replace(
  "<PASSWORD>",
  process.env.DB_PASSWORD
);
const LDB = process.env.DB_LOCAL.replace("<PASSWORD>", process.env.DB_PASSWORD);

mongoose
  .connect(DB)
  .then(() => {
    console.log("DB connection successful");
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => console.log(err));
