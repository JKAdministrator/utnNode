import jwt from "jsonwebtoken";
export const verifyAccessToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err)
        res
          .status(401)
          .json({ success: false, message: "Invalid or Expired token" });
      req.decoded = decoded;
      next();
    });
  } else {
    res
      .status(401)
      .json({ success: false, message: "No access token provided" });
  }
  return;
};
