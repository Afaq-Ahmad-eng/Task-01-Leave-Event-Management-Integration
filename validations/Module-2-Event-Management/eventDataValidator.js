import joi from 'joi'
const eventDataValidationSchema = joi.object({
    eventTitle: joi.string()
    .pattern(/^(?!.*(.)\1{3,})[A-Za-z0-9 ]{5,100}$/)
    .required()
    .messages({
        "string.pattern.base": "Title must be meaningful and cannot contain repeated characters"
    }),
    eventDescription: joi.string()
    .pattern(/^(?!.*(.)\1{4,})[A-Za-z0-9.,!?()'"\-\s]{20,}$/)
    .required()
    .messages({
        "string.pattern.base": "Description must be meaningful and cannot contain repeated characters"
    }),
    eventDate: joi.date().required(),
    eventTime: joi.string().required(),
    eventLocation: joi.string().required()
})

export const validateEventData = (eventData) => {
    const { error, value } = eventDataValidationSchema.validate(eventData);
    return { error, value };
};