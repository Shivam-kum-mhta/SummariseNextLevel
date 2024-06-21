const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser=require('body-parser');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const app = express();
const PORT = 5000;


app.use(bodyParser.json());
app.use(cors());

const User = require('./database/models/User.cjs');
const SearchHistory = require('./database/models/SearchHistory.cjs')


app.get('/api/context', async (req, res) => {
  const { url } = req.query;
  if (!url) {return res.status(400).json({ error: 'URL is required' });}
  try {
    const response = await axios.get(url);
    console.log(url)
    res.status(200).json(response.data)
    console.log('Successfully response sent')
   } catch (error) {
    console.log('server error')
    res.status(500).json({ error: 'Failed to fetch content' });
  }
});

app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
    console.log(`${username, email, password} is registered`)
  } catch (error) {
    res.status(400).json({ error: 'Error registering user' });
  }
});

app.post('/history', async (req, res)=>{
  const {keywords}=req.body;
  try{
    const newSearchHistory = new SearchHistory({keywords});
    await newSearchHistory.save();
    res.status(200).json({ message: 'Search history successfully' });
    console.log(`keywords =${keywords}`)
  } catch (error) {
    res.status(402).json({error: 'Error creating search history'})}
  }
)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
