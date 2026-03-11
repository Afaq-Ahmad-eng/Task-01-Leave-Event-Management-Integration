import express from "express";
import eventCreateByAdminRouterventByAdmin  from "../../controllers/Module-2-Event-Management/eventCreateByAdmin.Controller.js";
import { adminAuthenticationHandler } from "../../middleware/Module-1-Leave-Management/adminAuthentication.js";

const eventCreateByAdminRouter = express.Router();

eventCreateByAdminRouter.post('/admin-create-event', adminAuthenticationHandler, eventCreateByAdminRouterventByAdmin);

export default eventCreateByAdminRouter;