const { default: axios } = require("axios");
const { response } = require("express");
const express = require("express");
const router = express.Router();
const passport = require("../config/ppConfig");
//import db
const db = require("../models");



//adds a new comment
router.get("/new", (req, res) => {
  res.render("comments/new");
});


router.get("/:id", (req, res) => {
  db.comment
    .findOne({
      where: { id: req.params.id },
      include: [db.user],
    })
    .then((journals) => {
      res.render("comments/show", {comments });
    })
    .catch((error) => {
      res.render("comments/signed-in");
    });
});


//post one individual comment
router.post("/new", (req, res) => {
  db.comment
    .create({
      userId: req.user.id,
      subject: req.body.subject,
      comment: req.body.comment,
    })
    .then((post) => {
      res.redirect("/journals/:id");
    })
    .catch((error) => {
      res.render("comments/new");
    });
});


router.put("/:id", async (req, res) => {
  try {
    const commentUpdated = await db.journal.update(
      {
        subject: req.body.subject,
        comment: req.body.comment,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    console.log("number of journals updated should be 1", commentUpdated);
    res.redirect(`/comments/${req.params.id}`);
  } catch (error) {
    console.log("did not update user(s) because of >>>", error);
    res.redirect(`/comments/${req.params.id}`);
  }
});

//delete
router.delete("/:id", async (req, res) => {
  let commentDeleted = await db.comment.destroy({
    where: { id: req.params.id },
  });
  res.redirect("/comments");
});


router.get('*', (req, res) => {
    res.render('journals/404');
  })
  
  module.exports = router;
  