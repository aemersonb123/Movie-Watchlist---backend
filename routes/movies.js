const express = require('express');
const router = express.Router();
const { validateMovie, Movie } = require('../models/Movie');
const authorization = require('../middleware/authorization');
const objectId = require('../middleware/objectId');

router.get('/', async (req, res) => {
  const movies = await Movie.find();
  return res.send(movies);
});

router.post('/', authorization, async (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { posterImageUrl, name, releaseYear } = req.body;

  movie = new Movie({ posterImageUrl, name, releaseYear });
  await movie.save();

  res.send(movie);
});

router.delete('/:id', [authorization, objectId], async (req, res) => {
  const id = req.params.id;

  let movie = await Movie.findByIdAndDelete(id);
  if (movie) return res.send(movie);
  else return res.status(404).send('The movie with this id was not found.');
});

router.put('/:id', [authorization, objectId], async (req, res) => {
  const id = req.params.id;

  const { error } = validateMovie(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { posterImageUrl, name, releaseYear } = req.body;

  movie = await Movie.findById(id);

  if (!movie)
    return res.status(404).send('The movie with this id was not found.');

  movie.posterImageUrl = posterImageUrl;
  movie.name = name;
  movie.releaseYear = releaseYear;

  await movie.save();

  res.send(movie);
});

module.exports = router;
