import {Event} from "../../models/Module-2-Event-Management/adminCreateEventModel.js";
const eventDeleteByAdmin = async (req, res) => {
    try {
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
        await Event.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: "Event deleted successfully",
        });
    } catch (error) {
        console.error("Error in eventDeleteByAdmin: ", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error,
        });
    }
};

export default eventDeleteByAdmin;