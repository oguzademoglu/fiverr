import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import cors from 'cors';
import userRoute from './routes/user.route.js'
import authRoute from './routes/auth.route.js'
import conversationRoute from './routes/conversation.route.js'
import gigRoute from './routes/gig.route.js'
import messageRoute from './routes/message.route.js'
import ordersRoute from './routes/order.route.js'
import reviewRoute from './routes/review.route.js'


const app = express();
dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: 'http://localhost:5173', credentials: true}))

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO)
        console.log('mongo connected')
    } catch (error) {
        console.log(error)
    }
}

app.use('/api/users', userRoute)
app.use('/api/auth', authRoute)
app.use('/api/conversation', conversationRoute)
app.use('/api/gigs', gigRoute)
app.use('/api/message', messageRoute)
app.use('/api/orders', ordersRoute)
app.use('/api/reviews', reviewRoute)




const PORT = process.env.PORT || 8800

app.listen(PORT, () => {
    connect();
    console.log("server is running");
})