import express from "express";
import http from "http";
import { PORT, NODE_ENV } from "./config/keys";
import "./config/database";
import routes from "./config/routes";
import bodyParser from "body-parser";
import passport from "passport";

const app = express();
const server = http.createServer(app);
app.use(bodyParser.json({ limit: "4mb" }));
app.use(bodyParser.urlencoded({ extended: false }));

//passport middleware
app.use(passport.initialize());
//passwort config
require("./config/passport")(passport);

app.use("/", routes);

server.listen(PORT, () =>
  console.log(`started in ${NODE_ENV} environment on port ${PORT}`)
);
