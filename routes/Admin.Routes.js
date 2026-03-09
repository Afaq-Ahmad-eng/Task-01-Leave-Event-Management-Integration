import express from 'express'
import adminController from '../controllers/AdminRegistration.Controller.js'
import adminLoginValidation  from '../validations/adminLoginValidation.js'
import { adminLogin } from '../controllers/adminLogin.Controller.js'    
import { adminAuthenticationHandler } from '../middleware/adminAuthentication.js'
import adminPanel from '../controllers/adminPanel.Controller.js'
import { approveOrRejectLeave } from '../controllers/approveOrRejectLeave.Controller.js'
const adminRouter = express.Router();


// Admin registration route
adminRouter.post('/admin-registration', adminController);

// Admin login route
adminRouter.post('/admin-login', adminLoginValidation, adminLogin);

// Admin panel route (protected)
adminRouter.get('/admin-panel', adminAuthenticationHandler, adminPanel);

// Approve or reject leave request route (protected)
adminRouter.post('/admin-approve-or-reject-leave', adminAuthenticationHandler, approveOrRejectLeave);
export default adminRouter;