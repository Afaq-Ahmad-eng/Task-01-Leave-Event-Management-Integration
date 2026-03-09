import adminRegistration from "../models/AdminRegistrationModel.js";
import { employeeLoginPasswordVerification } from  "../utils/passwordHash.js"
import { adminToken, adminRefreshToken } from "../utils/jwtToken.js";
import adminRefreshTokenForDB from "../models/AdminRefreshToken.js";

export const adminLogin = async (req, res) => {
    const { AdminEmail, AdminPassword } = req.body;
    
    try {
        const existingAdmin = await adminRegistration.findOne({ AdminEmail });
        if (!existingAdmin) {
            return res.status(400).json({
                message: "Admin not found",
            });
        }
        const isPasswordValid = await employeeLoginPasswordVerification(AdminPassword, existingAdmin.AdminPassword);
        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid password",
            });
        }
        const token = adminToken(existingAdmin._id);
        res.cookie("adminToken", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 15 * 60 * 1000, // 15 minutes
            path: "/",
        });

        const refreshToken = adminRefreshToken(existingAdmin._id);
       
        await adminRefreshTokenForDB.findOneAndUpdate({
            adminId: existingAdmin._id
        }, {
            refreshToken: refreshToken
        }, {
            upsert: true,
            new: true
        });
 
        res.cookie("adminRefreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
            path: "/",
        });
        
        res.status(200).json({
            message: "Admin login successful",
            token,
            refreshToken,
        });
    } catch (error) {
        console.error("Login error ", error);
        res.status(500).json({
            message: "Internal Server Error",
            error: error,
        });
    }
};