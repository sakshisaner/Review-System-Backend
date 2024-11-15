import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import dbConnect from "./Config/database.js";
import router from "./routes/FeedbackRoute.js";


const app=express();
const PORT=3000;
app.use(express.json())

//mounting api routes
app.use("/api/v1",router)

dotenv.config();



dbConnect();



app.listen(PORT,()=>{
console.log(`server is running at port:${PORT}`)
})