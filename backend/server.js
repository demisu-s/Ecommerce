import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/user.js";

const app = express();
dotenv.config();

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.k9brmiq.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.error("Error connecting to database:", err);
  });

  app.get('/',(req,res)=>{
    res.send("hello i am back")
  })

// Using json and urlencoded middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Using the userRoutes
app.use("/api", userRoutes);
app.post("/data", (res, req) => {});

// Use this to start the server or create the server to listen
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
