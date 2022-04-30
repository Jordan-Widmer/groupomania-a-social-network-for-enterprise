const express = require("express");
const Joi = require("@hapi/joi");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 100,
  host: "localhost",
  user: "root",
  password: "",
  database: "Groupomania",
  port: 3307
});
const tablename = "Posts";

// var mongoose = require("mongoose");
// const { findOneAndUpdate } = require("../models/Feed");
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
      const query = `SELECT post.id, post.image , post.text, post.addedAt , user.name, user.email,
       user.img as img, user.id as addedBy FROM Posts as post
      JOIN Users as user
      on user.id = post.addedBy
      Order By post.addedAt Desc
      `;
      connection.query(query, (err, rows) => {
        if (err) {
          console.log(err);
          return;
        }
        let promises = [];
        let promises1 = [];
        for (var i = 0; i < rows.length; i++) {
          promises.push(getcomments(rows[i].id));
          promises1.push(getLikes(rows[i].id));
        }
        Promise.all(promises)
          .then((comments) => {
            Promise.all(promises1).then((likes) => {
              connection.release();
              rows.map((feed) => {
                feeds.push({
                  ...feed,
                  likes: likes.filter(
                    (f) => f.length > 0 && f[0].post_id == feed.id
                  ),
                  comments: comments.filter(
                    (f) => f.length > 0 && f[0].postid == feed.id
                  ),
                });
              });
              res.send(feeds);
            });
          })
          .catch((error) => {
            console.log(error);
          });
      });
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
};
function getcomments(postid) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      const query = `SELECT c.comment , c.id , c.userid , c.postid , u.name , u.img FROM Comments as c 
join Users as u 
on c.userid = u.id
where c.postid = ${postid}
    `;
      connection.query(query, (err, row) => {
        if (err) {
          console.log(err);
          return reject("Falied to get comments");
        }
        return resolve(row);
      });
    });
  });
}

function getLikes(postid) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      const query = `SELECT * FROM Likes where post_id = ${postid}
    `;
      connection.query(query, (err, row) => {
        if (err) {
          console.log(err);
          return reject("Falied to get likes");
        }
        return resolve(row);
      });
    });
  });
}
