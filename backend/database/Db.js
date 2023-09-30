import mongoose from "mongoose";
import dotenv from "dotenv";
import { log } from "console";

dotenv.config()//initializing the dotenv file...!!
// getting the env details...
const USERNAME = process.env.DB_USERNAME
const PASSWORD = process.env.DB_PASSWORD
// mongoDB connection url for ...
const URL = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.g1vsz8w.mongodb.net/book_reviews`

const Connection = async() =>{
    try {
        // connected to mongoDB...!!
        await mongoose.connect(URL, {useUnifiedTopology: true});
        console.log("MongoDB is connected successfully ...!!");
    } catch (error) {
        console.log("Error in MongoDB connection",error.message);
    }
}

export default Connection;