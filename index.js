const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('config');
const cors = require('cors');

app.use(
  cors({
    exposedHeaders: ['x-auth-token'],
  })
);

const authRoute = require('./routes/auth');
const usersRoute = require('./routes/users');
const moviesRoute = require('./routes/movies');
const watchlistRoute = require('./routes/watchlist');

app.use(express.json());
app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/movies', moviesRoute);
app.use('/api/watchlist', watchlistRoute);

require('./error-handling')(app);

const MONGO_URI =
  config.get('mongoURI') || 'mongodb://localhost:27017/movie-watchlist';
mongoose.connect(MONGO_URI, () => console.log('Connected to mongodb...'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('Listening on PORT: ' + PORT);
});
