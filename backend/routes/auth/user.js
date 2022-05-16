const express = require("express");
const Joi = require("@hapi/joi");
const mysql = require("mysql");
const jsonwebtoken = require("jsonwebtoken");

const bcrypt = require("bcryptjs");

const router = express.Router();

const pool = mysql.createPool({
  connectionLimit: 100,
  host: "localhost",
  user: "root",
  password: "",
  database: "Groupomania",
  port: 3307,
});
const tablename = "Users";

/**
 * @route POST / api/auth
 * @description Authorize user & get token
 * @access Public
 */
router.post("/", async (req, res) => {
  // Validating Request Body
  const { error } = signInValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  // Pulling the info from req body
  const { email, password } = req.body;
  console.log(password);

  try {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      const query = `SELECT * FROM ${tablename} WHERE email = '${email}'`;
      connection.query(query, async (err, rows) => {
        connection.release();
        if (err) {
          console.log(err);
          return;
        }
        if (rows.length > 0) {
          if (bcrypt.compareSync(password, rows[0].password)) {
            console.log("ok");
            const jwt = jsonwebtoken.sign(
              {
                userId: rows[0].id,
                isAdmin: rows[0].isAdmin,
                exp: Math.floor(Date.now() / 1000) + 60 * 60,
              },
              process.env.SECRET_KEY
            );
            const { password, ...user } = rows[0];
            res.send({ jwtToken: jwt, user: user });
          } else {
            console.log("nok");
            res.status(401).json({ msg: "Invalid Credentials" });
          }
        } else {
          res.status(401).json({
            msg: "Invalid Credentials",
          });
        }
      });
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// Schema Validation Object
const signInValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().max(20),
});

module.exports = router;
