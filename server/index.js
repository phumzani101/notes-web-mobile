import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import morgan from "morgan";
import routes from "./routes/index.js";
import config from "./config/index.js";

const app = express();

// db connection
mongoose
  .connect(config.mongoUri)
  .then(() => {
    console.log(`Mongodb connected at ${config.mongoUri}`);
  })
  .catch((err) => {
    console.log("DB CONNECTION ERROR: ", err);
  });

// middlewares
app.use(express.json({ limit: "4mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

// route middlewares
app.use("/api/auth", routes.authRoutes);

app.listen(config.port, () =>
  console.log(`Server running on port ${config.port}`)
);
