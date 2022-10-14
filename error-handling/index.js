module.exports = (app) => {
  app.use((req, res, next) => {
    res.status(404).send('Cannot find route (404)');
  });

  app.use((err, req, res, next) => {
    console.error('Error: ', req.method, req.path, err);

    if (!res.headersSent) {
      res.status(500).send('Internal server error (500)');
    }
  });
};
