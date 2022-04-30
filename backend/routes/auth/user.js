const express = require("express");
const Joi = require("@hapi/joi");
const mysql = require("mysql");

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

  try {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      const query = `SELECT * FROM ${tablename} WHERE email = '${email}'`;
      connection.query(query, (err, rows) => {
        connection.release();
        if (err) {
          console.log(err);
          return;
        }
        if (rows.length > 0) {
          if (rows[0].password == password) {
            res.send(rows[0]);
          } else {
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
