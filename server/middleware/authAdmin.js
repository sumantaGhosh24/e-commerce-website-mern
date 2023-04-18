const jwt = require("jsonwebtoken");

const authAdmin = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({message: "Unauthorized"});
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) return res.status(403).json({message: "Forbidden"});
      req.email = decoded.UserInfo.email;
      req.role = decoded.UserInfo.role;
      req.id = decoded.UserInfo.id;
      if (req.role === "admin") {
        next();
      } else {
        return res
          .status(401)
          .json({message: "Only admin can access this routes."});
      }
    });
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

module.exports = authAdmin;
