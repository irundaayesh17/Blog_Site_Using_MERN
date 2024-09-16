import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        console.log("mongo uri", process.env.MONGO_URI);
        const conn =  await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        console.log(`MongoDB Connection Successful: ${conn.connection.host}`);
    } catch (error) {
        console.log(`MongoDB Connection Failed: ${error.message}`);
        process.exit(1);
    }
};