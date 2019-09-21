const express = require('express');
const axios = require('axios');

const app = express();
const url = 'https://api.github.com/users/';

app.get('/', (req, res) => {
if(!req.query.username) return res.status(200).json({ error: 'Please enter username.' });
  axios.get(url+req.query.username).then(response => {
    console.log(response)
    return res.status(200).json({ response: response.data });
  })
  .catch(err => {
    return res.json(err);
  });
  
});

app.listen(8080,(err) => {
    if (err) throw err;
    console.log('Server Up And Running !')
})