const mongoose = require('mongoose');

// Define the schema for a Planet
const planetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  distanceFromSun: {
    type: Number, // You can keep it as a number (in millions of kilometers or AU)
    required: true,
  },
  dayLength: {
    type: Number, // Length of a day in Earth hours
    required: true,
  },
  yearLength: {
    type: Number, // Length of a year in Earth days
    required: true,
  },
  hasLife: {
    type: Boolean,
    required: true,
  },

});

// Creates the Planet model from the schema
const Planet = mongoose.model('Planet', planetSchema);

module.exports = Planet;