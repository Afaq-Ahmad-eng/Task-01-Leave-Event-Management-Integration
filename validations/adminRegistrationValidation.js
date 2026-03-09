import joi from 'joi'

const adminRegistrationValidationSchema = joi.object({
    AdminName: joi.string().required(),
    AdminEmail: joi.string().required(),
    AdminPassword: joi.string().required()
})

const adminRegistrationValidationHandler = (adminRegistrationDataForValidation) =>{
  const {error, value} = adminRegistrationValidationSchema.validate(adminRegistrationDataForValidation);
  console.log(adminRegistrationDataForValidation);
  if(error){
    console.log(error);
    return error
  }else{
    return value
  }
}

export default adminRegistrationValidationHandler;