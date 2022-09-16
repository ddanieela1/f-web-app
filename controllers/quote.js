const { default: axios } = require('axios');
const express = require('express');
const router = express.Router();
const passport = require('../config/ppConfig');
//import db
const db = require('../models');


//homepage that shows quotes
  router.get('/signed-in', (req, res) => {
    const data = req.params
    const options = {
      method: 'POST',
      url: 'https://motivational-quotes1.p.rapidapi.com/motivation',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': process.env.API_KEY,
        'X-RapidAPI-Host': 'motivational-quotes1.p.rapidapi.com'
      },
      data: '{"key1":"value","key2":"value"}',
    }
    axios.request(options)
    .then(response => {
      console.log(response.data);
      res.render('signed-in', {response});
    })
    .catch(error=>{
      console.log(error);
      res.redirect('/auth/login');
    });
  });
  
//leads to past entries
router.get('/signed-in/show',(req, res) => {
    console.log(req.params)
    const options = {
      method: 'POST',
      url: 'https://motivational-quotes1.p.rapidapi.com/motivation',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': process.env.API_KEY,
        'X-RapidAPI-Host': 'motivational-quotes1.p.rapidapi.com'
      },
      data: '{"key1":"value","key2":"value"}',
    }
    axios.request(`https://motivational-quotes1.p.rapidapi.com/motivation`)
    .then(response =>{
      console.log(response.data);
      res.render('show', {quote: {response}});//response.data
    })
    .catch(error=>{
      console.log(error);
      res.redirect('/auth/signed-in');
    });
  });
  
  
  
// router.get('/signed-in/:id',(req, res) => {
//   console.log(req.params)
//   const options = {
//     method: 'POST',
//     url: 'https://motivational-quotes1.p.rapidapi.com/motivation',
//     headers: {
//       'content-type': 'application/json',
//       'X-RapidAPI-Key': process.env.API_KEY,
//       'X-RapidAPI-Host': 'motivational-quotes1.p.rapidapi.com'
//     },
//     data: '{"key1":"value","key2":"value"}',
//   }
//   axios.request(`https://motivational-quotes1.p.rapidapi.com/motivation`)
//   .then(response =>{
//     console.log(response.data);
//     res.render('/show', {quote: {response}});//response.data
//   })
//   .catch(error=>{
//     console.log(error);
//     res.redirect('/auth/signed-in');
//   });
// });

module.exports = router;