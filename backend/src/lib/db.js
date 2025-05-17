import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB is connected ${connect.connection.host} `)
    } catch (error) {
        console.log(`Error while connecting to MongoDB: ${error.message}`);
        process.exit(1); // Exit process with failure
    }
}