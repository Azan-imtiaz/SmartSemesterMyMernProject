require("dotenv").config();
require("./db/conn");
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 4000;
const router = require("./router/router");
const cookieParser = require('cookie-parser');


app.use(cookieParser());

app.use(cors());
app.use(express.json());
app.use(router);

app.use("/uploads", express.static("./uploads"));
app.use("/files",express.static("./public/files"));
app.listen(PORT, () => {
  console.log(`server started at port ${PORT}`);
});
