import mongoose from 'mongoose';

export const connect_DB = async (mongoURL) => {
    try {
        const con = await mongoose.connect(mongoURL)
        console.log('Connected to MongoDB', con.connection.host);        
        } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // 1 indicates failure, 0 indicates success
        }
    }