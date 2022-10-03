const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middleware/isLoggedIn")
const {Op} = require("sequelize");
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
router.get("/", isLoggedIn,(req, res) => {
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
router.get("/favorites", isLoggedIn,(req, res) => {
  db.journal.findAll({
    where: { 
      [Op.and]:[
        {userId: req.user.id},
        {favorite: true}
      ]
    }
  }).then((journals) => {
    res.render("journals/favorites", { journals: journals });
  })
  .catch((err) => {
    res.render("./404")
  });
});

//open journal in a new page for a bigger view
router.get("/new", isLoggedIn,(req, res) => {
  res.render("journals/new");
});

//edit
router.get("/edit/:id", isLoggedIn, (req, res) => {
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

router.get("/:id", isLoggedIn, (req, res) => {
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

router.get('/search', isLoggedIn,(req, res) => {
  res.render('journals/search');
});

router.post("/results", isLoggedIn, async (req, res) => {

  const options = {
    params: { q: req.body.search },
  };
  const response = await db.journals.findAll(options);
  res.render("journals/results", { journals:journals });
});

//post favorite entry
router.put("/:id/favorites", isLoggedIn, async (req, res) => {
  const { favorite } = req.body;
  db.journal.update({
    favorite: favorite? false: true,
  },{
    where: {id: parseInt(req.params.id)}
  })
  .then((post) => {
    res.redirect("/journals/favorites");
  })
  .catch((error) => {
    res.render("./404");
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
      res.render("./404");
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
router.delete("/:id", isLoggedIn, async (req, res) => {
  let quoteDeleted = await db.journal.destroy({
    where: { id: req.params.id },
  });
  res.redirect("/journals");
});



module.exports = router;
