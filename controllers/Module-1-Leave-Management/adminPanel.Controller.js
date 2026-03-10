import EmployeeLeave from "../models/Module-1-Leave-Management/employeeLeaveModel.js";

const adminPanel = async (req, res) => {

    const allEmployeeLeaveData = await EmployeeLeave.find();
    res.status(200).json({
        message: "Admin panel accessed successfully",
        leaveData: allEmployeeLeaveData,
    });
};

export default adminPanel;