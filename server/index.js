const express = require('express');
const app = express();
const db = require('./db/database')
const path = require('path');
const routes = require('./routes');
const port = process.env.PORT || 3000;

// Middleware
app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.use('/public', express.static(path.join(__dirname, '../public')));
app.use('/', routes);

// Serves up the html page to start our frontend
app.get('/', (req, res, next)=> {
  res.sendFile(path.join(__dirname, '../index.html'));
});

db.sync()
  .then(()=> {
    app.listen(port, console.log(`you are listening on port ${port}`))
  })
