const express = require("express");
const cors = require("cors");
const dbConnection = require("./modules/dbconnection");
require("dotenv").config();

const routes = require("./routes");
const app = express();

app.set("port", process.env.SERVER_PORT);
app.disable("x-powered-by");

app.use(routes);
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send(403);
});

app.listen(app.get("port"), () =>
  console.log(`RestAPI running at ${app.get("port")}`)
);
