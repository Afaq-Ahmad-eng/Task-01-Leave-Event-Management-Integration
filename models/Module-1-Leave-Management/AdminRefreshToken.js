import mongoose from "mongoose";

const adminRefreshTokenSchema = mongoose.Schema({
    adminId:{
         type: mongoose.Schema.Types.ObjectId,
                ref: "adminPanel",
                required: true
    },
    refreshToken:{
        type: String,
        required: [true, "Refresh token is needed "]
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3 * 24 * 60 * 60, // 3 days
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
})

const adminRefreshTokenForDB = mongoose.model("adminRefreshToken", adminRefreshTokenSchema);

export default adminRefreshTokenForDB;