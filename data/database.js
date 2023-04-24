import mongoose from "mongoose";

export const connectDB = async() => {
  await mongoose
    .connect(process.env.MONGO_URI2, {
      dbName: "backendapi",
    })
    .then((c) => console.log(`Database Connected with ${c.connection.host}`))
    .catch((e) => console.log(e));
};
