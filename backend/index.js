import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './const/db.js';
import router from './route/user.route.js';

dotenv.config = express();

const app = express();

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
};

app.use(cors(corsOptions));


// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const PORT = process.env.PORT||8081;

app.use((res,r,next) => {
    console.log(`res.cookies.get("token")`,res.cookies.token)
    next()
})
app.use("/api/v1", router);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running at ${PORT}`);
});