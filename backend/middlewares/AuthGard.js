const jwt = require("jsonwebtoken");
const { createSecretKey } = require("crypto");

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  try {
    if (!token) {
      throw "Token not found";
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    if (decoded?.exp < new Date() / 1000) {
      throw "Token expired";
    }

    if (
      req.body?.addedBy &&
      decoded?.userId != req.body.addedBy &&
      !decoded?.isAdmin
    ) {
      throw "Identity invalid";
    }

    console.log("request authorized");
    next();
  } catch (e) {
    res
      .status(401)
      .json({ error: e || "You're not authorized. Contact administrators." });
  }
};
