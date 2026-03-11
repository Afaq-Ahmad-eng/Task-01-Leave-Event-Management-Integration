import { validateEventData } from "../../validations/Module-2-Event-Management/eventDataValidator.js";
import { Event } from "../../models/Module-2-Event-Management/adminCreateEventModel.js";

const EventCreateByAdmin = async (req, res) => {
  try {
      const [year, month, day] = req.body.eventDate.split("/");
      const y = Number(year.trim());
      const m = Number(month.trim()) - 1; // months are 0-indexed
      const d = Number(day.trim());
      const utcDate = new Date(
          Date.UTC(y,m,d),
        );
        req.body.eventDate = utcDate;

    const validationResult = validateEventData(req.body);
    if (validationResult.error) {
      return res.status(400).json({
        message: "Validation failed",
        errors: validationResult.error.details[0].message,
      });
    }
    
    let query = {
      eventTitle: validationResult.value.eventTitle,
      eventDate: validationResult.value.eventDate,
    };

    const eventData = await Event.exists(query);

    if (eventData) {
      return res.status(400).json({
        message:
          "Event has already created now if you want to change something then go and edit!.",
      });
    }

    const {
      eventTitle,
      eventDescription,
      eventDate,
      eventTime,
      eventLocation,
    } = validationResult.value;
    const createdBy = req.adminId;

    // Create a new event document
    const newEvent = new Event({
      eventTitle,
      eventDescription,
      eventDate: utcDate,
      eventTime,
      eventLocation,
      createdBy,
    });
    await newEvent.save();
    res.status(201).json({
      success: true,
      message: "Event created successfully",
      eventId: newEvent._id,
    });
  } catch (error) {
    console.error("Error in EventCreateByAdmin: ", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error,
    });
  }
};

export default EventCreateByAdmin;
