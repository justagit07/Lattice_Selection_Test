import express from "express";
import dotenv from "dotenv";
dotenv.config();
// dotenv for the unshareable keys

import bodyParser from "body-parser";
import mongoose from "mongoose";
import Allroutes from "./routes/Allroutes";

const app = express();
app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));

const dbconnection = () => {
  try {
    mongoose.connect(process.env.MONGODB_URI);
    console.log("your connection is established ");
  } catch (error) {
    console.log("getting error in the database connectivity", error);
  }
};

dbconnection();

//routes work here

// http://localhost:3000/api/patients/register is the route which work to register patient

app.use("/api", Allroutes);

// creating server of express

app.listen(process.env.PORT || 3001, () => {
  console.log(
    `your server is running at the 3000 \n http://localhost:${process.env.PORT}`,
  );
});
