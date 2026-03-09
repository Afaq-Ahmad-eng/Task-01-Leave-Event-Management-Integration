//import moongoose for database communication
import dotenv from 'dotenv'
dotenv.config();
import mongoose from "mongoose";

export const connectDB = async () => {
    // prefer the value from .env; fall back to a sensible default
    const uri = process.env.mongoURI || "mongodb://localhost:27017/day-one-task-one/employee-registration";
    console.log('connecting to:', uri);
    try{
        await mongoose.connect(uri);
        console.log("MongoDB connected!");
    }catch(error){
        console.error("MongoDB connection failed", error);
        process.exit(1);
    }
}

