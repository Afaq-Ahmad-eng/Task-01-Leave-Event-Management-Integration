import express from 'express'
import router from './routes/Module-1-Leave-Management/employeeLeave.Routes.js';
import employeeRegistrationRoute from './routes/Module-1-Leave-Management/employeeRegistration.Routes.js';
import { connectDB } from './config/database.js';
import adminRouter from './routes/Module-1-Leave-Management/Admin.Routes.js';
import eventCreateByAdminRouter from './routes/Module-2-Event-Management/EventCreateByAdmin.Routes.js';
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json())
app.use(cookieParser());
connectDB()
app.use('/api',router);
app.use('/api',employeeRegistrationRoute);
app.use('/api',adminRouter);
app.use('/api', eventCreateByAdminRouter);


export default app;