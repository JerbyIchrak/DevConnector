import mongoose from "mongoose";
import { DB } from "./keys";

mongoose.connect(
  DB,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true
  },
  err => {
    if (!err) {
      console.log("Connect To Database -------------->");
      return;
    }
    console.log(err);
  }
);
