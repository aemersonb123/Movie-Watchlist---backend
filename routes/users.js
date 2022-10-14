const express = require('express');
const router = express.Router();
const { validateUser, User } = require('../models/User');
const bcrypt = require('bcrypt');
const Watchlist = require('../models/Watchlist');

router.post('/', async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ username: req.body.username });
  if (user) return res.status(400).send('Username is already taken.');

  user = new User({ username: req.body.username });
  user.passwordHash = (await bcrypt.hash(req.body.password, 10)).toString();
  user.watchlist = (await new Watchlist().save())._id;
  await user.save();

  const token = user.generateAuthToken();
  res.set('x-auth-token', token).send({
    _id: user._id,
    username: user.username,
  });
});

module.exports = router;
