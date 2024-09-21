import express from 'express'
import mongoose from "mongoose";
import UserRouter from "./routes/UserRouters";
import cors from 'cors';
import ProductRouter from "./routes/ProductRouters";

const app = express()
const port = 8000;

app.use(cors())
app.use(express.json())
app.use(express.static('public'))
app.use('/users' , UserRouter)
app.use('/products' , ProductRouter)
const run = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/Exam');
        console.log('Connected to MongoDB');
    }catch (e){
        console.error('Error connecting to MongoDB:', e)
    }
    app.listen(port, () => {
        console.log('We are live on http://localhost:' + port);
    });

    process.on('exit', () => {
        mongoose.disconnect();
    });
}

run()