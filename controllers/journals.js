const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();
const passport = require("../config/ppConfig");
//import db
const db = require("../models");

//homepage that shows quotes
router.get("/signed-in", (req, res) => {
  const data = req.params;
  const options = {
    method: "POST",
    url: "https://motivational-quotes1.p.rapidapi.com/motivation",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": process.env.API_KEY,
      "X-RapidAPI-Host": "motivational-quotes1.p.rapidapi.com",
    },
    data: '{"key1":"value","key2":"value"}',
  };
  axios
    .request(options)
    .then((response) => {
      console.log(response.data);
      res.render("signed-in", { response });
    })
    .catch((error) => {
      console.log(error);
      res.redirect("/auth/login");
    });
});

//leads to past entries
router.get("/", (req, res) => {
  db.journal
    .findAll()
    .then((journals) => {
      res.render("journals/index", { journals: journals });
    })
    .catch((error) => {
      res.render("signed-in");
    });
});

//open journal in a new page for a bigger view
router.get("/new", (req, res) => {
  res.render("journals/new");
});

//post one individual entry
router.post("/new", (req, res) => {
  db.journal
    .create({
      userId: req.user.id,
      subject: req.body.subject,
      entry: req.body.entry
    })
    .then((post) => {
      res.redirect("/journals"); //or '/show' route
    })
    .catch((error) => {
      res.render("journals/new");
    });
});

router.get("/journals/:id", (req, res) => {
  db.journal
    .findOne({
      where: { id: req.params.id },
      include: [db.userId, db.subject, db.entry, db.quote],
    })
    .then((journals) => {
      res.render("journals/show", { journals: journals });
    })
    .catch((error) => {
      res.render("signed-in");
    });
});

module.exports = router;
