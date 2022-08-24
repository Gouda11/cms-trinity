import fs from 'fs'
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";

import Grower from '../models/growerModel.js'

dotenv.config();
const __dirname = path.resolve();


const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`mongodb connected ${conn.connection.host}`);
    } catch (err) {
        console.log(err);
        process.exit(1)
    }
}
connectDB();

// READ FILE
const growers = JSON.parse(fs.readFileSync(`${__dirname}/data/users.json`, 'utf-8'));
console.log(growers)
    // IMPORT DATA INTO DB

const importData = async() => {
    try {
        await Grower.create(growers);
        console.log('Data successfully loaded');
    } catch (error) {

    }
}

// DELETE ALL DATA FROM COLLECTION
const deleteData = async() => {
    try {
        await Grower.deleteMany();
        console.log('Data Deleted Successfully!')
    } catch (error) {
        console.log(error)
    }
}

if (process.argv[2] === '--import') {
    importData();
} else if (process.argv[2] === '--delete') {
    deleteData();
}
//console.log(process.argv);

// run command node data/import.js --delete
// node data/import.js --import