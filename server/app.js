// server/app.js
const express = require('express');
const session = require('express-session');
const path = require('path');
const spotifyRoutes = require('./routes/spotifyRoutes');
const { sessionSecret } = require('./config');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: true
}));

app.use('/', spotifyRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});