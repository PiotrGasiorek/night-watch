import express from "express";
import expressLayouts from "express-ejs-layouts";
import path from "path";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import router from "./routes/index.js";

process.env.NODE_ENV !== "production" && require("dotenv").parse();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlPraser: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to Mongoose"));

app.use("/", router);

app.listen(process.env.PORT || 3000);
