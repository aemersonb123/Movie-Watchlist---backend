const Joi = require('joi');
const mongoose = require('mongoose');

const watchlistSchema = new mongoose.Schema({
  items: {
    type: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Movie',
      },
    ],
    default: [],
  },
});

const Watchlist = mongoose.model('Watchlist', watchlistSchema);
module.exports = Watchlist;
