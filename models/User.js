const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: 3,
    maxlength: 55,
    required: true,
  },
  passwordHash: {
    type: String,
    minlength: 8,
    maxlength: 1024,
    required: true,
  },
  watchlist: {
    type: mongoose.Types.ObjectId,
    ref: 'Watchlist',
  },
});

userSchema.method('generateAuthToken', function () {
  const token = jwt.sign(
    { username: this.username, _id: this._id, watchlistId: this.watchlist },
    config.get('jwtPrivateKey')
  );
  return token;
});

const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = Joi.object({
    username: Joi.string().min(3).max(55).required(),
    password: Joi.string().min(8).max(55).required(),
  });

  return schema.validate(user);
}

exports.User = User;
exports.validateUser = validateUser;
