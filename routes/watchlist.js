const express = require('express');
const router = express.Router();
const authorization = require('../middleware/authorization');
const objectId = require('../middleware/objectId');
const { Movie } = require('../models/Movie');
const Watchlist = require('../models/Watchlist');

router.get('/', authorization, async (req, res) => {
  let watchlist = await Watchlist.findById(req.user.watchlistId).populate(
    'items'
  );
  res.send(watchlist.items);
});

router.post('/add/:id', [authorization, objectId], async (req, res) => {
  let watchlist = await Watchlist.findById(req.user.watchlistId);
  let movie = await Movie.findById(req.params.id);
  if (!movie)
    return res.status(404).send('The movie with this id was not found.');

  if (watchlist.items.includes(movie._id))
    return res.status(400).send('Movie is already in the watchlist.');

  watchlist.items.push(movie._id);
  await watchlist.save();

  res.send(movie);
});

router.delete('/remove/:id', [authorization, objectId], async (req, res) => {
  let watchlist = await Watchlist.findById(req.user.watchlistId);
  let movie = await Movie.findById(req.params.id);

  if (!watchlist.items.includes(movie._id))
    return res.status(404).send('Movie is not in the watchlist.');

  watchlist.items.pop(watchlist.items.indexOf(movie._id));
  await watchlist.save();

  res.send(movie);
});

module.exports = router;
