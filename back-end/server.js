import express from "express";
import path from "path";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import movieRoutes from "./routes/movieRoutes.js";
import configRoutes from "./routes/configRoutes.js";

dotenv.config();

const app = express();

connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is runnung");
});

app.use("/api/users", userRoutes);

app.use("/api/movies", movieRoutes);

app.use("/api/config/movies", configRoutes);

const __dirname = path.resolve();

if (process.env.NODE_ENV === "development") {
   app.get("/", (req, res) => {
    res.send("API is running");
  });
} else {
 app.use(express.static(path.join(__dirname, "/front-end/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "front-end", "build", "index.html"))
  );
}

app.use(notFound);

app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(
  { port },
  console.log(`server running in ${process.env.NODE_ENV} on ${port}`)
);
