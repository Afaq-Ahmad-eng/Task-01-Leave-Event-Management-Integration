import Employee from "../models/Module-1-Leave-Management/employeeRegistrationModel.js";
import { employeeRegistrationPasswordHash } from "../utils/passwordHash.js"
import { validationOfEmployeeRegistrationData } from "../validations/employeeRegistrationValidation.js";
export const employeeRegistration = async (req,res) => {
    try{
    const validationResult = validationOfEmployeeRegistrationData(req.body);
        if(validationResult.details){
        return res.status(400).json({
            message: validationResult.details[0].message
        })
    }else{
    const existingEmail = await Employee.findOne({email: validationResult.email});
    if(existingEmail){
        return res.status(400).json({
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
        message:"Employee Register successfully ",
        employeeId: employee._id
        })
    }
}}catch(error){
    console.error("Registration error ", error);
    res.status(500).json({
        message: "Internal Server Error",
        error: error
    })
}
}