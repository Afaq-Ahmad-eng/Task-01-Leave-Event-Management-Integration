import express from 'express'
import adminController from '../controllers/AdminRegistration.Controller.js'
import adminLoginValidation  from '../validations/adminLoginValidation.js'
import { adminLogin } from '../controllers/adminLogin.Controller.js'    
import { adminAuthenticationHandler } from '../middleware/adminAuthentication.js'
import adminPanel from '../controllers/adminPanel.Controller.js'
import { approveOrRejectLeave } from '../controllers/approveOrRejectLeave.Controller.js'
const adminRouter = express.Router();

adminRouter.post('/admin-registration', adminController);

adminRouter.post('/admin-login', adminLoginValidation, adminLogin);

adminRouter.get('/admin-panel', adminAuthenticationHandler, adminPanel);

adminRouter.post('/admin-approve-or-reject-leave', adminAuthenticationHandler, approveOrRejectLeave);
export default adminRouter;