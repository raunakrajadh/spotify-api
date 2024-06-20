// server/config.js
require('dotenv').config();

module.exports = {
  spotifyClientID: "2463a046cedb42da97cb4fb7b45f4207",
  spotifyClientSecret: "85c38f62d3df4d1abbe0d8043d6dbe2c",
  spotifyRedirectURI: "http://localhost:3000/callback",
  sessionSecret: "your_session_secret",
  downloadDir: "downloads"
};
