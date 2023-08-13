import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/user.js";

const app = express();
dotenv.config();

// Database connection
mongoose.connect(process.env.DB_URL, { useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', (error) => console.log(error));
db.once('open', () => console.log("Connected to database!"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send("Hello, I am back");
});

app.use("/api", userRoutes);

app.post("/data", (req, res) => {
  // Handle the POST request here
  res.send("Data received successfully");
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
