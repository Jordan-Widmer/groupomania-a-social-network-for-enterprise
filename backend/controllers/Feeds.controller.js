const express = require("express");
const Joi = require("@hapi/joi");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const mysql = require("mysql");
var async = require("async");

let i = 0;
let j = 0;

const pool = mysql.createPool({
  connectionLimit: 100,
  host: "localhost",
  user: "root",
  password: "",
  database: "Groupomania",
  port: 3307,
});
const tablename = "Posts";

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

const upload = multer({
  storage: storage,
});

module.exports = {
  getAllFeeds: async (req, res) => {
    let feeds = [];
    pool.getConnection((err, connection) => {
      if (err) throw err;
      try {
        const query = `SELECT post.id, post.image , post.text, post.addedAt , user.name, user.email,
         user.img as img, user.id as addedBy FROM Posts as post
        JOIN Users as user
        on user.id = post.addedBy
        Order By post.addedAt Desc
        `;
        connection.query(query, async (err, rows) => {
          if (err) {
            console.log(err);
            return;
          }

          res.send(rows);
        });
      } catch (error) {
        res.send("err");
      }
    });
  },

  likeFeed: async (req, res) => {
    const { likedBy } = req.body;
    let query = `INSERT INTO Likes ( user_id, post_id) VALUES (${+likedBy}, ${+req
      .params.id});`;
    try {
      pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query(query, (err, rows) => {
          connection.release();
          if (err) {
            console.log(err);
            return;
          }
          res.status(201).send(rows);
        });
      });
    } catch (error) {
      console.log(error);
      res.status(500).send("Server Error");
    }
  },
  dislikeFeed: async (req, res) => {
    const { dislikedBy } = req.body;
    let query = `DELETE FROM Likes where user_id = ${+dislikedBy} AND post_id = ${+req
      .params.id};`;
    try {
      pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query(query, (err, rows) => {
          connection.release();
          if (err) {
            console.log(err);
            return;
          }
          res.status(201).send(rows);
        });
      });
    } catch (error) {
      console.log(error);
      res.status(500).send("Server Error");
    }
  },
  commentFeed: async (req, res) => {
    const { Comment, commentBy } = req.body;
    let query = `INSERT INTO Comments ( userid, postid, comment) VALUES (${+commentBy}, ${+req
      .params.id} , "${Comment}");`;
    try {
      pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query(query, (err, rows) => {
          connection.release();
          if (err) {
            console.log(err);
            return;
          }
          res.status(201).send(rows);
        });
      });
    } catch (error) {
      console.log(error);
      res.status(500).send("Server Error");
    }
  },
  addFeed: async (req, res) => {
    const { text, addedBy } = req.body;
    let query = "";
    if (req.file) {
      query = `INSERT INTO ${tablename} (text , addedBy, image) VALUES ("${text}", ${+addedBy} , "${
        req.file.filename
      }");`;
    } else {
      query = `INSERT INTO ${tablename} (text , addedBy) VALUES ("${text}", ${+addedBy});`;
    }
    try {
      pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query(query, (err, rows) => {
          connection.release();
          if (err) {
            console.log(err);
            return;
          }
          res.status(201).send(rows);
        });
      });
    } catch (error) {
      console.log(error);
      res.status(500).send("Server Error");
    }
  },
  editFeed: async (req, res) => {
    const { text } = req.body;
    let query = "";
    if (req.file) {
      query = `Update ${tablename} Set text = "${text}" , image = "${req.file.filename}" where id = ${req.params.id};`;
    } else {
      query = `Update ${tablename} SET text = "${text}" where id = ${req.params.id};`;
    }
    try {
      pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query(query, (err, rows) => {
          connection.release();
          if (err) {
            console.log(err);
            return;
          }
          res.status(201).send(rows);
        });
      });
    } catch (error) {
      console.log(error);
      res.status(500).send("Server Error");
    }
  },

  deleteCommentFeed: async (req, res) => {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      const query = `DELETE from Comments where id = ${req.params.id}`;
      connection.query(query, (err, rows) => {
        connection.release();
        if (err) {
          console.log(err);
          return;
        }
        res.send(rows);
      });
    });
  },
  editComment: async (req, res) => {
    pool.getConnection((err, connection) => {
      const query = `UPDATE Comments Set comment = "${req.body.comment}" where id = ${req.params.id};`;
      connection.query(query, (err, rows) => {
        connection.release();
        if (err) {
          console.log(err);
          return;
        }
        res.status(201).send(rows);
      });
    });
  },
  deleteFeed: async (req, res) => {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      const query = `DELETE from ${tablename} where id = ${req.params.id}`;
      connection.query(query, (err, rows) => {
        connection.release();
        if (err) {
          console.log(err);
          return;
        }
        res.send(rows);
      });
    });
  },

  getComments: async (req, res) => {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      const query = `SELECT c.comment , c.id , c.userid , c.postid , u.name , u.img FROM Comments as c 
      join Users as u 
      on c.userid = u.id
      where c.postid = ${req.params.id}`;
      connection.query(query, (err, rows) => {
        connection.release();
        if (err) {
          console.log(err);
          return;
        }
        res.send(rows);
      });
    });
  },

  getLikes: async (req, res) => {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      const query = `SELECT * FROM Likes where post_id = ${req.params.id}`;
      connection.query(query, (err, rows) => {
        connection.release();
        if (err) {
          console.log(err);
          return;
        }
        res.send(rows);
      });
    });
  },
};
// function getcomments(postid) {
//   j++
//   console.log("get calleed. comments" + j)
//   return new Promise((resolve, reject) => {
//     pool.getConnection((err, connection) => {
//       if (err) throw err;
//       const query = `SELECT c.comment , c.id , c.userid , c.postid , u.name , u.img FROM Comments as c
// join Users as u
// on c.userid = u.id
// where c.postid = ${postid}
//     `;
//       connection.query(query, (err, row) => {
//         if (err) {
//           console.log(err)
//           return reject("Falied to get comments")
//         }
//         return resolve(row)
//       })
//     })
//   });
// }

// function getLikes(postid) {
//   i++
//   console.log("get calleed. likes" + i)
//   return new Promise((resolve, reject) => {
//     pool.getConnection((err, connection) => {
//       if (err) throw err;
//       const query = `SELECT * FROM Likes where post_id = ${postid}
//     `;
//       connection.query(query, (err, row) => {
//         if (err) {
//           console.log(err)
//           return reject("Falied to get likes")
//         }
//         return resolve(row)
//       })
//     })
//   });
// }
