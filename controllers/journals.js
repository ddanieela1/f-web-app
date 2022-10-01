const { default: axios } = require("axios");
const { response } = require("express");
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
      res.render("journals/signed-in", { response });
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
      res.render("journals/signed-in");
    });
});

//list of favorite entries
router.get("/favorites", (req, res) => {
  db.journal.findAll().then((journals) => {
    res.render("journals/favorites", { journals: journals });
  });
});

//open journal in a new page for a bigger view
router.get("/new", (req, res) => {
  res.render("journals/new");
});

//edit
router.get("/edit/:id", (req, res) => {
  db.journal
    .findOne({
      where: { id: req.params.id },
    })
    .then((journal) => {
      res.render("journals/edit", { journal: journal, userId: req.user.id });
    })
    .catch((error) => {
      console.log("error", error);
      res.redirect("/journals");
    });
});

router.post("/results", async (req, res) => {

  const options = {
    params: { q: req.body.search },
  };
  const response = await db.journals.findAll(options);
  res.render("journals/results", { journals:response.data.journals });
});

//post favorite entry
router.post("/favorites", async (req, res) => {
  const favJournal = db.journal.create({
    subject: req.body.subject,
    quote: req.body.quote,
    entry: req.body.entry,
    userId: req.user.id,
  });

  // res.redirect to all favorite songs
  res.redirect("/favorites");
});

router.get("/:id", (req, res) => {
  db.journal
    .findOne({
      where: { id: req.params.id },
      include: [db.user],
    })
    .then((journals) => {
      res.render("journals/show", { journals });
    })
    .catch((error) => {
      res.render("journals/signed-in");
    });
});

//post one individual entry
router.post("/new", (req, res) => {
  console.log(req.body);
  db.journal
    .create({
      userId: req.user.id,
      subject: req.body.subject,
      entry: req.body.entry,
    })
    .then((post) => {
      res.redirect("/journals");
    })
    .catch((error) => {
      res.render("journals/new");
    });
});

router.post("/signed-in", (req, res) => {
  db.journal
    .create({
      userId: req.user.id,
      subject: req.body.subject,
      entry: req.body.entry,
    })
    .then((post) => {
      res.redirect("/journals");
    })
    .catch((error) => {
      res.render("journals/404");
    });
});

router.put("/:id", async (req, res) => {
  try {
    const numRowsUpdated = await db.journal.update(
      {
        subject: req.body.subject,
        entry: req.body.entry,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    console.log("number of journals updated should be 1", numRowsUpdated);
    res.redirect(`/journals/${req.params.id}`);
  } catch (error) {
    console.log("did not update user(s) because of >>>", error);
    res.redirect(`/journals/${req.params.id}`);
  }
});

//delete
router.delete("/:id", async (req, res) => {
  let quoteDeleted = await db.journal.destroy({
    where: { id: req.params.id },
  });
  res.redirect("/journals");
});


router.get('*', (req, res) => {
  res.render('404');
})

module.exports = router;
