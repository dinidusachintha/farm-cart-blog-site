import express from "express";
import cors from "cors";
import { connectDB } from "./Config/db.js";
import blogRouter from "./routes/blogRoute.js";
import userRouter from "./routes/userRoutes.js";
import 'dotenv/config';

// app config
const app = express();
const port = process.env.PORT || 4000;  // It's good to allow the port to come from env

// middleware
app.use(express.json());
app.use(cors());

// db connection
connectDB();

// api endpoints
app.use("/api/blog", blogRouter);
app.use("/images", express.static('uploads'));
app.use("/api/user", userRouter);

// root endpoint
app.get("/", (req, res) => {
  res.send("Hello World");
});

// start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
