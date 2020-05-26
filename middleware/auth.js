const jwt = require("jsonwebtoken");
const config = require("config");

exports.auth = function (req, res, next) {
  // get token from header
  const token = req.header("auth-token");

  if (!token) {
    return res.status(401).json({ msg: "Authorization dednied" });
  }
  try {
    const decoded = jwt.verify(token, config.get("JWTSecret"));
    // decoded.user because we used user object as a payload in token
    req.user = decoded.user;
    // req.userId = decoded.userId;
    // req.email = decoded.email;
    // req.role = decoded.role;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Authorization dednied" });
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.user.role === 0) {
    return res.status(403).json({
      error: "Admin resourse! Access denied",
    });
  }
  next();
};
