const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    restaurant: {
      type: Schema.Types.ObjectId,
      ref: 'Restaurants',
      required: true
    },
    date: {
      type: String,
      required: true
    },
    time: {
      type: String,
      required: true
    },
    partySize: {
      type: Number,
      required: true
    },
    creater:{
        type:Schema.Types.ObjectId,
        ref:'Users',
        required:true
    }
  });

const Booking = mongoose.model('Bookings', bookingSchema);
module.exports = Booking;