import express from 'express';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import cors from 'cors'
dotenv.config()
import {errorHandler,notFound} from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
const port = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
import userRoute from './routes/userRoutes.js'
connectDB();
app.use('/api/users',userRoute);

app.get('/',(req,res)=>{
    res.send("hello world")
})


app.use(notFound);
app.use(errorHandler);

app.listen(port,()=>{
    console.log(`The server is running port ${port}`);
})