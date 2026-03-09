import joi from 'joi'
const employeeRegistrationSchemaForValidation = joi.object({
    name: joi.string().required(),
    email: joi.string().required(),
    position: joi.string().required(),
    subCategoryPosition: joi.string().required(),
    password: joi.string().required()
})
export const validationOfEmployeeRegistrationData = (registrationData) => {
   const {error, value} = employeeRegistrationSchemaForValidation.validate(registrationData);
   if(error){
    console.log("we are in the validation function ", error);
    return error
   }else{
    return value
   }
}