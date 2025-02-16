import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Mongo connected succesfully!`);
    } catch (error) {
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1);
    }
}

export default connectDB;