const Joi = require('joi');
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  posterImageUrl: {
    type: String,
    minlength: 1,
    maxlength: 2048,
    required: true,
  },
  name: {
    type: String,
    minlength: 1,
    maxlength: 1024,
    required: true,
  },
  releaseYear: {
    type: Number,
    required: true,
  },
});

const Movie = mongoose.model('Movie', movieSchema);

function validateMovie(movie) {
  const schema = Joi.object({
    posterImageUrl: Joi.string()
      .min(1)
      .max(2048)
      .required()
      .label('Poster image url'),
    name: Joi.string().min(1).max(1024).required().label('Name'),
    releaseYear: Joi.number().required().label('Release year'),
  });

  return schema.validate(movie);
}

exports.Movie = Movie;
exports.validateMovie = validateMovie;
