import express from "express";
import cors from "cors"
import Connection from "./database/Db.js";
import router from "./Routes/userRoutes.js";
import cookieParser from "cookie-parser";

// // for adding python file
// import { spawn } from 'child_process';

// // Execute the Python script
// const pythonProcess = spawn('python', ['probsolve1.py']);

// // Capture and handle the output
// pythonProcess.stdout.on('data', (data) => {
//   console.log(`Python script output: ${data}`);
// });

// // Handle errors, if any
// pythonProcess.stderr.on('data', (data) => {
//   console.error(`Python script error: ${data}`);
// });

// // Listen for the Python script to exit
// pythonProcess.on('close', (code) => {
//   console.log(`Python script exited with code ${code}`);
// });



const app = express();
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use("/api/v1",router)
// connecting with mongoDB....
Connection();
const PORT = 5000;

app.listen(PORT,() =>{console.log(`Your Server is running at ${PORT}...`);})
