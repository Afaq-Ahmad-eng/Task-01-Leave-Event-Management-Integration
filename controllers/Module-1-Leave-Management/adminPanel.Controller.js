import EmployeeLeave from "../../models/Module-1-Leave-Management/employeeLeaveModel.js";

const adminPanel = async (req, res) => {

    const allEmployeeLeaveData = await EmployeeLeave.find();
    res.status(200).json({
        success: true,
        message: "Welcome to the admin panel",
        leaveData: allEmployeeLeaveData,
    });
};

export default adminPanel;