import JWT from "jsonwebtoken"

// we get jwt secret key or token:-

const SECRET_KEY = process.env.JWT_SECRET_KEY;
const EXPIRE_COOKIE = process.env.EXPIRE_COOKIE;

// Create a JWT when a user logs in
export const createToken =async(user, res,statusCode) =>{
    try {
        const token = await JWT.sign({ id:user._id }, SECRET_KEY, { expiresIn: `${EXPIRE_COOKIE}d` });
const options = {
  expires: new Date(Date.now() + EXPIRE_COOKIE * 24 * 60 * 60 * 1000), // Cookie expiration time in milliseconds
  httpOnly: true, 
  }
            // Set the token as a cookie with the specified expiration time
    res.cookie('token', token,options );

    return res.status(statusCode).json({ success: true, user, message: "Token created and stored in a cookie successfully!" });

    } catch (error) {
        console.log("Failed to create token",error.message);
    }
  }
