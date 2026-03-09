import express from 'express'
import router from './routes/employeeLeave.Routes.js';
import employeeRegistrationRoute from './routes/employeeRegistration.Routes.js';
import { connectDB } from './config/database.js';
import adminRouter from './routes/Admin.Routes.js';
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json())
app.use(cookieParser());
connectDB()
app.use('/api',router);
app.use('/api',employeeRegistrationRoute);
app.use('/api',adminRouter);


export default app;