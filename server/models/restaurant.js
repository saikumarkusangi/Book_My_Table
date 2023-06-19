const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  contactNumber: {
    type: String,
    required: true,
  },
  menuCard: {
    type: String,
    required: true
  },
  ratings: {
    type: Number,
    required: true
  }
});

const collectionSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  restaurants: {
    type: [restaurantSchema],
    required: true
  }
});






const Restaurant = mongoose.model('Restaurants', restaurantSchema);
const Collection = mongoose.model('Collections', collectionSchema);


module.exports = { Restaurant, Collection };
