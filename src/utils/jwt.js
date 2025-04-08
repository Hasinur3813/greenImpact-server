import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const genereteToken = (user) => {
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );

  return token;
};
