import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";

import loginRoutes from "./routes/login.js";
import passkeyRoutes from "./routes/passkeys.js";

dotenv.config();

const app = new express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173", // replace with your frontend's origin
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.get("/", function (req, res) {
  res.status(200).json({ message: "Hello world" });
});

app.use("/api", loginRoutes);
app.use("/api", passkeyRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
