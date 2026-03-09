import EmployeeLeave from "../models/employeeLeaveModel.js";
import Employee from "../models/employeeRegistrationModel.js";
import employeeLeaveValidation from "../validations/employeeLeaveValidation.js";
export const employeeleave = async (req, res) => {
    console.log("we reached to the employee leave endpoint ", req.body);
    const validation = employeeLeaveValidation(req.body);
    if(validation.details){
        return res.status(400).json({
            message: validation.details[0].message
        })
    }else{
        const existingUser = await Employee.findOne({email: validation.email})
        if(!existingUser){
            return res.status(400).json({
                message: "Employee not found"
            })
        }

        console.log("existing user ", existingUser);
        const employeeOnLeave = await EmployeeLeave.findOne({
            employeeId: existingUser._id,
        }).sort({ createdAt: -1 });

        console.log("employee on leave ", employeeOnLeave);
         if(employeeOnLeave && employeeOnLeave.startDate <= validation.endDate && employeeOnLeave.endDate >= validation.startDate){
            return res.status(400).json({
                message: "Dear employee you have on leave and you don't allow that you paste a another leave request!",
            })
        }
            try{
            const leave = new EmployeeLeave({
                leaveType: validation.leaveType,
                startDate: validation.startDate,
                endDate: validation.endDate,
                reason: validation.reason,
                employeeId: existingUser._id
            });

            await leave.save();
            res.status(201).json({
                message: "Your leave request has pass to the HR",
                leaveId: leave._id
            })
        }catch(error){
            console.log("we get the error ",error)
        return res.status(400).json({
            message: " there is error ",
            data: error
        })
    }}
}
