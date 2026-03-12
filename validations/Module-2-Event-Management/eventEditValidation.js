import joi from "joi"
const editEventValidation = (data) => {
    const schema = joi.object({
        eventTitle: joi.string().min(3).max(100).required(),
        eventDescription: joi.string().min(10).max(500).required(),
        eventDate: joi.date().required(),
        eventTime: joi.string().required(),
        eventLocation: joi.string().min(3).max(100).required(),
    });
    return schema.validate(data);
}

const validateEventData = (data) => {
    const { error, value } = editEventValidation(data);
    return { error, value };
};

export { validateEventData };