import mongoose from "mongoose";

const { DATABASE_URL } = process.env;

if (!DATABASE_URL) {
    throw new Error(
      'Please define the DATABASE_URL environment variable inside .env.local'
    )
}

export const connect = async () => {
    const connectMongoDB = await mongoose
    .connect(DATABASE_URL)
    .catch(err => console.log(err))

    console.log("Mongo connection established");
    return connectMongoDB
}

