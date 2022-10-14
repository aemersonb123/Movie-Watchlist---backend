const express = require('express');
const router = express.Router();
const { User } = require('../models/user');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(400).send('Invalid username or password.');

  if (!(await bcrypt.compare(req.body.password, user.passwordHash)))
    return res.status(400).send('Invalid username or password.');

  const token = user.generateAuthToken();
  res
    .set('x-auth-token', token)
    .send({ _id: user._id, username: user.username });
});

module.exports = router;
