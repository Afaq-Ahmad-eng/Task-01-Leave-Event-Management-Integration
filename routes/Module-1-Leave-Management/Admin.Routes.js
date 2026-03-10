import express from 'express'
import adminController from '../../controllers/Module-1-Leave-Management/AdminRegistration.Controller.js'
import adminLoginValidation  from '../../validations/Module-1-Leave-Management/adminLoginValidation.js'
import { adminLogin } from '../../controllers/Module-1-Leave-Management/adminLogin.Controller.js'    
import { adminAuthenticationHandler } from '../../middleware/Module-1-Leave-Management/adminAuthentication.js'
import adminPanel from '../../controllers/Module-1-Leave-Management/adminPanel.Controller.js'
import { approveOrRejectLeave } from '../../controllers/Module-1-Leave-Management/approveOrRejectLeave.Controller.js'
const adminRouter = express.Router();


// Admin registration route
adminRouter.post('/admin-registration', adminController);

// Admin login route
adminRouter.post('/admin-login', adminLoginValidation, adminLogin);

// Admin panel route (protected)
adminRouter.get('/admin-panel', adminAuthenticationHandler, adminPanel);

// Approve or reject leave request route (protected)
adminRouter.post('/admin-approve-or-reject-leave/:leaveId', adminAuthenticationHandler, approveOrRejectLeave);
export default adminRouter;