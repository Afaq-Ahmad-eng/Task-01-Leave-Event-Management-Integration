import EmployeeLeave from "../../models/Module-1-Leave-Management/employeeLeaveModel.js";
import Employee from "../../models/Module-1-Leave-Management/employeeRegistrationModel.js";
import employeeLeaveValidation from "../../validations/Module-1-Leave-Management/employeeLeaveValidation.js";
export const employeeleave = async (req, res) => {
    
    const validation = employeeLeaveValidation(req.body);
    if(validation.details){
        return res.status(400).json({
            success: false,
            message: validation.details[0].message
        })
    }else{
        const existingEmployee = await Employee.findOne({email: validation.email})

        if(!existingEmployee){
            return res.status(400).json({
                success: false,
                message: "Employee not found"
            })
        }

        const employeeOnLeave = await EmployeeLeave.findOne({
            employeeId: existingEmployee._id,
        }).sort({ createdAt: -1 });

         if(employeeOnLeave && employeeOnLeave.startDate <= validation.endDate && employeeOnLeave.endDate >= validation.startDate){
            return res.status(400).json({
                success: false,
                message: "Dear employee you have on leave and you don't allow that you paste a another leave request!",
            })
        }
            try{
            const leave = new EmployeeLeave({
                leaveType: validation.leaveType,
                startDate: validation.startDate,
                endDate: validation.endDate,
                reason: validation.reason,
                employeeId: existingEmployee._id
            });

            await leave.save();
            res.status(201).json({
                success: true,
                message: "Your leave request has been submitted to the HR",
                leaveId: leave._id
            })
        }catch(error){
        return res.status(400).json({
            success: false,
            message: "Error occurred while processing leave request",
            data: error
        })
    }}
}
