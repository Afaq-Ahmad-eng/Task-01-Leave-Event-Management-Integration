import mongoose from "mongoose";

const adminPanelSchema = new mongoose.Schema({
    AdminName: {
        type: String,
        required:[true, "Admin name required"],
    },
    AdminEmail: {
        type: String,
        required:[true, "Admin email required"],
    },
    AdminPassword: {
        type: String,
        required:[true, "Admin name required"],
    },
    role: {
      type: String,
      enum: ["admin", "moderate-admin","super-admin"],
      default: "admin"
    }
},{
    timestamps: true
})

const adminRegistration = mongoose.model("adminPanel",adminPanelSchema);

export default adminRegistration;