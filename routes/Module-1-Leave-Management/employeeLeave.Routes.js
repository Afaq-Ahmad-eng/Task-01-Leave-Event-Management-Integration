import express from 'express'
import { employeeleave } from '../../controllers/employeeLeave.Controller.js';
const router = express.Router();

router.post('/employee-leave',employeeleave);

export default router;