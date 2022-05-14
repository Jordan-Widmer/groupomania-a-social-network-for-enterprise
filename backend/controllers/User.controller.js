const express = require("express");
const Joi = require("@hapi/joi");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const mysql = require("mysql");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.resolve();
    const localPath = `${uploadPath}/uploads/`;
    cb(null, localPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const pool = mysql.createPool({
  connectionLimit: 100,
  host: "localhost",
  user: "root",
  password: "",
  database: "Groupomania",
  port: 3307,
});
const tablename = "Users";

const upload = multer({
  storage: storage,
});

module.exports = {
  registerUser: async (req, res) => {
    try {
      pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log("connected as Id", +connection.threadId);
        const { name, email, password } = req.body;
        const query = `Select * From ${tablename} where email = '${email}'`;
        connection.query(query, (err, rows) => {
          if (err) {
            console.log(err);
            return;
          }
          if (rows.length > 0) {
            res.status(400).json({
              msg: "Email Already Exists",
            });
          } else {
            const query = `INSERT INTO ${tablename} (name , email , password) VALUES ("${name}", "${email}", "${password}");`;
            connection.query(query, (err, rows) => {
              connection.release();
              if (err) {
                console.log(err);
                return;
              }
              res.status(201).send(rows);
            });
          }
        });
      });
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  },
  updateUser: async (req, res) => {
    const { name, email, password } = req.body;
    // Build contact object
    const updateUser = {};
    if (name) updateUser.name = name;
    if (email) updateUser.email = email;
    if (password) updateUser.password = password;
    if (req.file) updateUser.imageAvatar = req.file.filename;
    try {
      pool.getConnection((err, connection) => {
        if (err) throw err;
        const { name, email, password } = req.body;
        let sql = "";
        if (req.file) {
          console.log("with file");
          sql = `Update ${tablename} SET name = '${name}' , email = '${email}' , password = '${password}', img = '${req.file.filename}' where id = ${req.params.id}`;
        } else {
          console.log("with our file");
          sql = `Update ${tablename} SET name = '${name}' , email = '${email}' , password = '${password}' where id = ${req.params.id}`;
        }
        connection.query(sql, (err, rows) => {
          if (err) {
            console.log(err);
            return;
          }
          let sql = `select * from Users where id = ${req.params.id}`;
          connection.query(sql, (err, row) => {
            if (err) {
              console.log(err);
              return;
            }
            res.status(201).send(row[0]);
          });
        });
      });
    } catch (error) {
      console.log(error);
      res.status(500).send("Server Error");
    }
  },
  deleteUser: async (req, res) => {
    try {
      pool.getConnection((err, connection) => {
        if (err) throw err;
        const query = `DELETE FROM ${tablename} WHERE id = ${req.params.id};`;
        connection.query(query, (err, rows) => {
          connection.release();
          if (err) {
            console.log(err);
            return;
          }
          res.status(200).send(rows);
        });
      });
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  },
  getMostActiveUsers(req, res) {
    try {
      pool.getConnection((err, connection) => {
        if (err) throw err;
        const query = `SELECT u.id, u.name , u.img, count(p.id) as "totalPosts" , DATE_FORMAT(MAX(p.addedAt),'%d %M %Y') as "lastpost" FROM Users as u
        JOIN Posts as p
        on u.id = p.addedBy
        GROUP By(u.id)
        ORDER BY  totalPosts  Desc
        LIMIT 3;`;
        connection.query(query, (err, rows) => {
          connection.release();
          if (err) {
            console.log(err);
            return;
          }
          res.status(200).send(rows);
        });
      });
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  },
  getMostRecentPosts(req, res) {
    try {
      pool.getConnection((err, connection) => {
        if (err) throw err;
        const query = `SELECT u.name, u.id, u.img , p.text , p.id as postid , DATE_FORMAT(p.addedAt,'%d %M %Y') as 'date' FROM Users as u 
        Join Posts as p
        on  u.id = p.addedBy
        ORDER By p.addedAt DESC
        LIMIT 3`;
        connection.query(query, (err, rows) => {
          connection.release();
          if (err) {
            console.log(err);
            return;
          }
          res.status(200).send(rows);
        });
      });
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  },
  getRegisteredUsers(req, res) {
    try {
      pool.getConnection((err, connection) => {
        if (err) throw err;
        const query = `SELECT u.id, u.name , u.email, u.img, count(p.id) as "totalPosts" , DATE_FORMAT(MAX(p.addedAt),'%d %M %Y') as "lastpost" , p.text as "posttitle" FROM Users as u
        Left JOIN Posts as p
        on u.id = p.addedBy
        WHERE u.isAdmin = 0
        GROUP By(u.id)
        ORDER BY p.addedAt`;
        connection.query(query, (err, rows) => {
          connection.release();
          if (err) {
            console.log(err);
            return;
          }
          res.status(200).send(rows);
        });
      });
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  },
};
