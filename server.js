const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
const methodOverride = require('method-override');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(methodOverride('_method'));

// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI,)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Import the Planet model
const Planet = require('./models/planet');

app.get('/test', (req, res) => {
  res.send('Server is up and running!');
});

app.get('/', async (req, res) => {
  try {
    const planets = await Planet.find();  
    res.render('index', { planets });
  } catch (error) {
    console.error('Error fetching planets:', error);
    res.status(500).send('Error fetching planets');
  }
});


app.post('/add-planet', async (req, res) => {
  try {
    const { name, type, distanceFromSun, hasLife, dayLength, yearLength } = req.body;
    const newPlanet = new Planet({
      name,
      type,
      distanceFromSun,
      dayLength: Number(dayLength),
      yearLength: Number(yearLength),
      hasLife: hasLife === 'on',
    });
    await newPlanet.save();
    res.redirect('/');
  } catch (error) {
    console.error('Error adding planet:', error);
    res.status(500).send('Error adding planet');
  }
});

function deletePlanet(planetId) {
  fetch(`/planet/${planetId}`, {
    method: 'DELETE',
  })
    .then(response => {
      if (response.ok) {
        alert("Planet deleted!");
        // The option to remove planet from the UI or refresh the list
      } else {
        alert("Failed to delete planet.");
      }
    })
    .catch(err => console.error('Error:', err));
}

app.delete('/planet/:id', async (req, res) => {
  const { id } = req.params; 
  try {
    const planet = await Planet.findByIdAndDelete(id);  
    if (planet) {
      res.status(200).send({ message: 'Planet deleted successfully' });
    } else {
      res.status(404).send({ message: 'Planet not found' });
    }
  } catch (error) {
    console.error('Error deleting planet:', error);
    res.status(500).send('Error deleting planet');
  }
});


app.listen(3000);