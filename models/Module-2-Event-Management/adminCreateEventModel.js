import mongoose from "mongoose";
const eventSchema = new mongoose.Schema({
    eventTitle: {
        type: String,
        required: [true, "Event name is required"],
        trim: true
    },
    eventDescription: {
        type: String,
        required: [true, "Event description is required"],
        trim: true
    },  
    eventDate: {
        type: Date,
        required: [true, "Event date is required"]
    },
        eventTime: {
        type: String,
        required: [true, "Event time is required"],
        trim: true
    },
        eventLocation: {
        type: String,
        required: [true, "Event location is required"],
        trim: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Event = mongoose.model("Event", eventSchema);

export {Event};