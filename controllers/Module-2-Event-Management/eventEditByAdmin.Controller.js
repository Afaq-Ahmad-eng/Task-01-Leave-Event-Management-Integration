import { Event } from "../../models/Module-2-Event-Management/adminCreateEventModel.js";
import UTCDate from "../../utils/Module-2-Event-Management/UTCDate.js";
import { validateEventData } from "../../validations/Module-2-Event-Management/eventEditValidation.js";
const eventEditByAdmin = async (req, res) => {
  try {
    const utcDate = UTCDate(req.body.eventDate);
    req.body.eventDate = utcDate;

    const validationResult = validateEventData(req.body);
    if (validationResult.error) {
      return res.status(400).json({
        message: "Validation failed",
        errors: validationResult.error.details[0].message,
      });
    }
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }
    const todayDate = new Date();
    if (event.eventDate < todayDate) {
      return res.status(409).json({
        success: false,
        message: "Event has already passed!",
      });
    }
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      validationResult.value,
      {
        returnDocument: "after",
      },
    );
    res.status(200).json({
      success: true,
      message: "We reached to the event edit endpoint!",
      updatedEvent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Serve Error",
      error,
    });
  }
};

export default eventEditByAdmin;
