import Employee from "../../models/Module-1-Leave-Management/employeeRegistrationModel.js";
import { employeeRegistrationPasswordHash } from "../../utils/Module-1-Leave-Management/passwordHash.js";
import { validationOfEmployeeRegistrationData } from "../../validations/Module-1-Leave-Management/employeeRegistrationValidation.js";
export const employeeRegistration = async (req,res) => {
    let validationResult = undefined;
    try{
        validationResult = validationOfEmployeeRegistrationData(req.body);
        if(validationResult.details){
        return res.status(400).json({
            success: false,
            message: validationResult.details[0].message
        })
    }else{
    const existingEmail = await Employee.findOne({email: validationResult.email});
    if(existingEmail){
        return res.status(400).json({
            success: false,
            message: "Your are already register!",
        })
    }else{
        const newGeneratedHashOfPassward = await employeeRegistrationPasswordHash(validationResult.password);

        const employee = new Employee({
            name: validationResult.name,
            email: validationResult.email,
            position: validationResult.position,
            subCategoryPosition: validationResult.subCategoryPosition,
            password: newGeneratedHashOfPassward
        });
        
        await employee.save();

        res.status(200).json({
            success: true,
            message: "Employee registered successfully",
            employeeId: employee._id
        })
    }
}}catch(error){
    res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error
    })
}
}