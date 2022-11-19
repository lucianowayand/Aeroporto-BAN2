import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/auth");

app.listen(5000, () =>
  console.log("REST API server ready at: http://localhost:5000")
);
