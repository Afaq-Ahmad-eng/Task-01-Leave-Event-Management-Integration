import adminRegistration from "../../models/Module-1-Leave-Management/AdminRegistrationModel.js";
import { employeeRegistrationPasswordHash } from "../../utils/Module-1-Leave-Management/passwordHash.js";
import adminRegistrationValidationHandler from "../../validations/Module-1-Leave-Management/adminRegistrationValidation.js";

const Admin = async (req, res) => {
  try {
  const existingAdmin = await adminRegistration.findOne({
    AdminEmail: req.body.AdminEmail,
  });

  // make sure we actually found a document before checking its role
  if (existingAdmin) {
    // if a record exists and the role is not plain 'admin', block
    if (existingAdmin.role && existingAdmin.role !== "admin") {
      return res.status(400).json({
        success: false,
        message: "You are not authorized to access this resource!"
      });
    }

    // admin already exists, don't create another with same email
    return res.status(400).json({
        success: false,
      message: "Admin already registered",
    });
  } else {
    
    const adminRegistrationDataValidation = adminRegistrationValidationHandler(
      req.body,
    );
    if (adminRegistrationDataValidation.details) {
      return res.status(400).json({
        success: false,
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
        success: true,
        message: "Registered successfully",
        AdminId: adminRegistrationInstance._id,
      });
    }
  }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error,
    });
  }
};

export default Admin;
