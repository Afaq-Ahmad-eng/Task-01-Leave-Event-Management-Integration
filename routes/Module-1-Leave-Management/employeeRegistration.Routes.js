import express from 'express'
import { employeeRegistration } from '../../controllers/Module-1-Leave-Management/employeeRegistration.Controller.js';
const employeeRegistrationRoute = express.Router();

employeeRegistrationRoute.post('/employee-registration',employeeRegistration)

export default employeeRegistrationRoute;