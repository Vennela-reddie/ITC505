const express = require('express');
const logger = require('morgan');
const path = require('path');
const server = express();

// Use express to parse URL-encoded data
server.use(express.urlencoded({ extended: true }));

// Logging with morgan
server.use(logger('dev'));

// Routes
server.get('/do_a_random', (req, res) => {
  res.send(`Your number is: ${Math.floor(Math.random() * 100) + 1}`);
});

// Setup static page serving for all pages in "public"
const publicServedFilesPath = path.join(__dirname, 'public');
server.use(express.static(publicServedFilesPath));

// POST handler for the Mad Lib form
server.post('/ITC505/lab-7/index.html', (req, res) => {
  const { animeCharacter, power, adjective, city, villain } = req.body;

  // Validate if all fields are filled
  if (!animeCharacter || !power || !adjective || !city || !villain) {
    res.send(`
      <h1>Submission Failed</h1>
      <p>Please fill out ALL fields.</p>
      <a href="/ITC505/lab-7/index.html">Go Back to Form</a>
    `);
    return;
  }

  // Mad Lib text with user inputs
  const madLib = `
    In the world of anime, there was a brave hero named ${animeCharacter}. 
    ${animeCharacter} had the incredible power to ${power}, which made them famous throughout the land. 
    One day, while walking through the streets of ${city}, ${animeCharacter} encountered a dangerous villain named ${villain}. 
    This villain was known for their ${adjective} abilities that could defeat even the strongest warriors.
    But ${animeCharacter} was ready for the challenge, and the battle that followed became legendary.
  `;

  // Send the mad lib back to the user
  res.send(`
    <h1>Mad Lib Result</h1>
    <p>${madLib}</p>
    <a href="/ITC505/lab-7/index.html">Go Back to Form</a>
  `);
});

// Listen on the correct port
let port = 80;
if (process.argv[2] === 'local') {
  port = 8080;
}
server.listen(port, () => console.log('Ready on localhost!'));
