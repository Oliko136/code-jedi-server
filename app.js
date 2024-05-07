import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json" assert { "type": "json" };

import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import boardRouter from "./routes/boardRoutes.js";
import columnRouter from "./routes/columnRoutes.js";
import cardRouter from "./routes/cardRoutes.js";

const { DB_HOST, PORT } = process.env;

const app = express();

app.use(express.static("images/public"));
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/boards", boardRouter);
app.use("/boards", columnRouter);
app.use("/boards", cardRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log(`Server is running. Use our API on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
