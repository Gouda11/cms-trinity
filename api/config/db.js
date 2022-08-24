import mongoose from 'mongoose';

export const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            // useCreateIndex: true,
            // useNewUrlParser: true,
            // useFindAndModify: false
        });
        console.log(`mongodb connected ${conn.connection.host}`);
    } catch (err) {
        console.log(err);
        process.exit(1)
    }
}
