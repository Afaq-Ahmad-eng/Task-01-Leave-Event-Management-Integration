import adminRefreshTokenForDB from "../models/AdminRefreshToken.js";
import { verifyJWTToken, adminRefreshToken, adminToken } from "../utils/jwtToken.js";
import dotenv from "dotenv";
dotenv.config();

export const adminAuthenticationHandler = async (req, res, next) => {
  
  if (!req.headers.cookie) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: No token provided",
    });
  }
  const token = Object.fromEntries(
    req.headers.cookie.split(";").map((cookie) => cookie.trim().split("=")),
  ).adminToken;
  const refreshTokenOfAdmin = Object.fromEntries(
    req.headers.cookie.split(";").map((cookie) => cookie.trim().split("=")),
  ).adminRefreshToken;

  let decodedToken = undefined;
  if (token) {
    decodedToken = verifyJWTToken(token, process.env.JWT_TOKEN_KEY);
  }
  if(decodedToken) {
     next();
  }

  let decodedRefreshToken = undefined;
  if (refreshTokenOfAdmin) {
    try {
      decodedRefreshToken = verifyJWTToken(
        refreshTokenOfAdmin,
        process.env.JWT_REFRESH_TOKEN_KEY,
      );
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Invalid refresh token",
        data: error,
      });
    }
  }

  const adminId = decodedRefreshToken.adminId;
  const adminRefreshTokenFromDB =
    await adminRefreshTokenForDB.findOne({ adminId });

    if (refreshTokenOfAdmin !== adminRefreshTokenFromDB.refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Invalid token",
        adminRedirectToLogin: true
      });
    }

  if (!decodedToken && !decodedRefreshToken) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid token",
    });
  }


  let newAdminRefreshToken = undefined;
  if (!decodedToken && decodedRefreshToken && refreshTokenOfAdmin === adminRefreshTokenFromDB.refreshToken) {
      newAdminRefreshToken = adminRefreshToken(decodedRefreshToken.adminId);
      const newToken = adminToken(decodedRefreshToken.adminId);
      res.cookie("adminToken", newToken, {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
          maxAge: 15 * 60 * 1000, // 15 minutes
        });
    res.cookie("adminRefreshToken", newAdminRefreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
    });

    const refreshTokenSave = await adminRefreshTokenForDB.findOneAndUpdate(
      { adminId },
      { refreshToken: newAdminRefreshToken },
      { 
        upsert: true, 
        returnDocument: "after"
       }
    );
    await refreshTokenSave.save();
    next();
  }
};
