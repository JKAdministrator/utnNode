import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/mongoDB/User.js";
const saltRounds = 10;

const generarToken = (payload) => {
  const userForToken = {
    userName: payload.fullName,
    userEmail: payload.email,
    sub: payload.id,
  };
  return jwt.sign(userForToken, process.env.JWT_SECRET, { expiresIn: "1h" });
};

export const authController = {
  async registerUser(req, res) {
    const { fullName, email } = req.body;
    const password = await hash(req.body.password, saltRounds);
    const newUser = await new User({ fullName, email, password });
    try {
      await newUser.save();
      return res.status(200).json({
        success: true,
        message: "New user registered",
        data: newUser,
      });
    } catch (e) {
      return res.status(500).json({
        success: true,
        message: `Error: ${e.message}`,
      });
    }
  },
  async login(req, res) {
    try {
      const users = await User.find().where({ email: req.body.email });

      if (!users || !users.length)
        return res.status(401).json({
          success: false,
          message: `Invalid username or password`,
        });

      const { password } = users[0];
      const isSamePassword = await compare(req.body.password, password);

      if (!isSamePassword)
        return res.status(401).json({
          success: false,
          message: `Invalid username or password`,
        });

      const accessToken = generarToken(users[0]);

      return res.status(200).json({
        success: true,
        message: `Login success`,
        data: accessToken,
      });
    } catch (e) {
      return res.status(500).json({
        success: true,
        message: `Error: ${e.message}`,
      });
    }
  },
};
