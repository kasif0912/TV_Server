import mongoose from "mongoose";

const connectDB = async () => {
  return await mongoose
    .connect(process.env.DATABASE)
    .then(() => console.log("Database connnected successfully"))
    .catch(() => console.log("error with connecting database"));
};

export default connectDB;
