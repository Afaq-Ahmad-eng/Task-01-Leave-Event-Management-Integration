import joi from "joi";
const adminLoginValidationSchema = joi.object({
    AdminEmail: joi.string().email().required(),
    AdminPassword: joi.string().min(6).required()
});

const adminLoginValidation = (req, res, next) => {
    const { AdminEmail, AdminPassword } = req.body;
    const { error } = adminLoginValidationSchema.validate({ AdminEmail, AdminPassword });
    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        });
    }
    next();
};

export default adminLoginValidation;