import mongoose from 'mongoose';

connect().then(() => console.log('Database connected')).catch(err => console.log(err));

async function connect() {
  await mongoose.connect (process.env.MONGO_URI) ;
}
export default connect;


// import mongoose from "mongoose";

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log("✅ Database connected");
//   } catch (error) {
//     console.error("❌ Database connection failed:", error);
//     process.exit(1);
//   }
// };

// export default connectDB;