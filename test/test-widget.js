router.post('/results', async (req, res) => {
    // get back the search item
    console.log('>>>>> SEARCH DATA', req.body);
    // use axios to find the results
    const options = {
        method: 'GET',
        url: "https://motivational-quotes1.p.rapidapi.com/motivation",
        params: { q: req.body.search },
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Key": process.env.API_KEY,
          "X-RapidAPI-Host": "motivational-quotes1.p.rapidapi.com",
        },
    };
    const response = await axios.request(options);

router.post("/results", (req, res) => {
    let results;
    
    let value = req.body.search;
        if (results === value) {
          db.journal
          .findAll({
            subject: req.body.subject,
            quote: req.body.quote,
            entry: req.body.entry,
            userId: req.user.id,
          });
        }
        res.render("journals/results", {hits});
    });

    router.post('/results', async (req, res) => {
        const options = {
            method: 'GET',
            params: { q: req.body.search },
            
        };
        const search = await db.journal.findAll(options);
        console.log('response >>>>', response.data.response.hits)
      
        // render the songs/results page 
        res.render('journals/results', { journals:journals });
      })
      

      router.post('/results', async (req, res) => {
        const options = {
            method: 'GET',
            params: { q: req.body.search },
        };
        let journalData = req.params
        const journals = await db.journal.findAll(options);
      
        // render the songs/results page 
        res.render('journals/results', { journals:journalData});
      })

      router.post('/results', async (req, res) => {
        // get back the search item
        console.log('>>>>> SEARCH DATA', req.body);
        // use axios to find the results
        const options = {
            method: 'GET',
            url: "https://motivational-quotes1.p.rapidapi.com/motivation",
            params: { q: req.body.search },
            headers: {
              "content-type": "application/json",
              "X-RapidAPI-Key": process.env.API_KEY,
              "X-RapidAPI-Host": "motivational-quotes1.p.rapidapi.com",
            },
        };
        const response = await axios.request(options);