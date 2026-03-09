import adminRegistration from "../models/AdminRegistrationModel.js";
import { employeeRegistrationPasswordHash } from "../utils/passwordHash.js";
import adminRegistrationValidationHandler from "../validations/adminRegistrationValidation.js";

const Admin = async (req, res) => {
  const existingAdmin = await adminRegistration.findOne({
    AdminEmail: req.body.AdminEmail,
  });

  // make sure we actually found a document before checking its role
  if (existingAdmin) {
    // if a record exists and the role is not plain 'admin', block
    if (existingAdmin.role && existingAdmin.role !== "admin") {
      return res.status(400).json({
        message: "You are not authorized to access this resource!"
      });
    }

    // admin already exists, don't create another with same email
    return res.status(400).json({
      message: "Admin already registered",
    });
  } else {
    
    const adminRegistrationDataValidation = adminRegistrationValidationHandler(
      req.body,
    );
    if (adminRegistrationDataValidation.details) {
      return res.status(400).json({
        message: "Error occur due to the validation fail",
      });
    } else {
      const adminPasswordHash = await employeeRegistrationPasswordHash(
        adminRegistrationDataValidation.AdminPassword,
      );
        const adminRegistrationInstance = new adminRegistration({
        AdminName: adminRegistrationDataValidation.AdminName,
        AdminEmail: adminRegistrationDataValidation.AdminEmail,
        AdminPassword: adminPasswordHash,
      });

      await adminRegistrationInstance.save();
      res.status(200).json({
        message: "Admin Register successfully",
        AdminId: adminRegistrationInstance._id,
      });
    }
  }
};

export default Admin;
