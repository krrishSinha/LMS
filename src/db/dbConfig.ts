
import mongoose from 'mongoose';


const connectDB = async () => {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
        throw new Error('MONGODB_URI environment variable is not defined');
    }

    try {
        const response = await mongoose.connect(uri)
        console.log('MongoDB connected successfully' + response.connection.host);

    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit process with failure
    }




}

export default connectDB;