import express from "express";
import { PORT, NODE_ENV } from "./config/keys";
import "./config/database";

const app = express();
app.listen(PORT, () =>
  console.log(`started in ${NODE_ENV} environment on port ${PORT}`)
);

app.get("/", (req, res) => res.send("Hello World! It's Ichrak"));
