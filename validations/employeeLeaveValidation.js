import joi from 'joi'
const emploeeLeaveValidationSchema = joi.object({
    leaveType: joi.string().valid("Casual","Emergency","Sick").required(),
    startDate: joi.date().required(),
    endDate: joi.date().greater(joi.ref('startDate')).required(),
    reason: joi.string().required(),
    email: joi.string().required()

})
const employeeLeaveValidation = (employeeData) =>{
    const dataForValidation = {
        leaveType: employeeData.leaveType,
        reason: employeeData.reason
    }
    const parsedStart = new Date(employeeData.startDate);
    const parsedEnd = new Date(employeeData.endDate);

    // Ensure dates parsed to valid Date objects
    if (!employeeData.startDate || isNaN(parsedStart.getTime())) {
        return { details: [{ message: 'startDate must be a valid date' }] };
    }
    if (!employeeData.endDate || isNaN(parsedEnd.getTime())) {
        return { details: [{ message: 'endDate must be a valid date' }] };
    }

    // Normalize to ISO strings so Joi parses consistently
    dataForValidation.startDate = parsedStart.toISOString();
    dataForValidation.endDate = parsedEnd.toISOString();
    dataForValidation.email = employeeData.email;

    const {error, value} = emploeeLeaveValidationSchema.validate(dataForValidation);
if(error){
    return error;
}else{
    // if(value.startDate <= value.endDate && value.endDate >= value.startDate){
    //     return {message: "your leave is overlap this is against our policy"}
    // }else{
    //     return value;
    // }
    return value
}
}

export default employeeLeaveValidation;