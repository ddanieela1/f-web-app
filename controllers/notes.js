const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middleware/isLoggedIn")
//import db
const db = require("../models");
// const db = require('./src/models').default;

//leads to past entries
router.get("/",isLoggedIn, (req, res) => {
  db.note
    .findAll()
    .then((notes) => {
      res.render("notes/index", { notes: notes });
    })
    .catch((error) => {
      res.render("journals/404");
    });
});

//open journal in a new page for a bigger view
router.get("/new",isLoggedIn, (req, res) => {
  res.render("notes/new");
});

router.get("/:id",isLoggedIn, (req, res) => {
  console.log("this is the user",req.user.id)
  db.note
    .findOne({
      where: { id: parseInt(req.params.id) },
      include: [db.user],
    })
    .then((note) => {
      res.render("notes/show", { note });
    })
    .catch((error) => {
      console.log('error********************',error);
      res.render("404");
    });
});

//post one individual entry
router.post("/new", isLoggedIn,(req, res) => {
  console.log(req.user.id)
  db.note
    .create({
      userId: req.user.id,
      subject: req.body.subject,
      note: req.body.note,
    })
    .then((post) => {
      res.redirect("/notes");
    })
    .catch((error) => {
      res.render("./404");
    });
});

router.put("/:id", isLoggedIn,async (req, res) => {
    try {
      const numRowsUpdated = await db.notes.update(
        {
          subject: req.body.subject,
          note: req.body.note,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      console.log("number of journals updated should be 1", numRowsUpdated);
      res.redirect(`/notes/${req.params.id}`);
    } catch (error) {
      console.log("did not update user(s) because of >>>", error);
      res.redirect(`/notes/${req.params.id}`);
    }
  });
  
  //delete
  router.delete("/:id",isLoggedIn, async (req, res) => {
    let noteDeleted = await db.note.destroy({
      where: { id: req.params.id },
    });
    res.redirect("/notes");
  });


module.exports = router;
