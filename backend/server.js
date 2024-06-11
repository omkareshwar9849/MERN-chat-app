import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import connectToMongoDB from "./db/connectToMongoDb.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cookieParser());
app.use(express.json()); // for parsing application/json

app.use("/api/auth",authRoutes);
app.use("/api/message",messageRoutes);
app.use("/api/user",userRoutes);

app.get("/",(req,res)=>{
    // root route http://localhost:5000
    res.send("Hello world!");
})

app.listen(PORT,()=>{
    connectToMongoDB();
    console.log(`server running on port ${PORT}`);
})