const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const aviaoRouter = require("./routes/aviao");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/aviao", aviaoRouter);

app.listen(5000, () =>
  console.log("REST API server ready at: http://localhost:5000")
);
