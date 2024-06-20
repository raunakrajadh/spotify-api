// server/controllers/spotifyController.js
const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');
const { spotifyClientID, spotifyClientSecret, spotifyRedirectURI, downloadDir } = require('../config');

const getLogin = (req, res) => {
  const scopes = 'user-read-private user-read-email';
  const redirectUri = 'https://accounts.spotify.com/authorize?' +
    new URLSearchParams({
      response_type: 'code',
      client_id: spotifyClientID,
      scope: scopes,
      redirect_uri: spotifyRedirectURI
    }).toString();
  res.redirect(redirectUri);
};

const getCallback = async (req, res) => {
  const code = req.query.code || null;
  const tokenOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri: spotifyRedirectURI,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + (Buffer.from(spotifyClientID + ':' + spotifyClientSecret).toString('base64'))
    },
    json: true
  };

  try {
    const response = await axios.post(tokenOptions.url, new URLSearchParams(tokenOptions.form).toString(), {
      headers: tokenOptions.headers
    });
    req.session.accessToken = response.data.access_token;
    res.redirect('/search');
  } catch (error) {
    res.send(error);
  }
};

const getSearch = (req, res) => {
  res.render('layout', { template: 'search', data: null });
};

const postSearch = async (req, res) => {
  const searchQuery = req.body.query;
  const token = req.session.accessToken;
  const searchOptions = {
    url: `https://api.spotify.com/v1/search?q=${searchQuery}&type=track`,
    headers: {
      'Authorization': `Bearer ${token}`
    },
    json: true
  };

  try {
    const response = await axios.get(searchOptions.url, { headers: searchOptions.headers });
    res.render('layout', { template: 'search', data: response.data.tracks.items });
  } catch (error) {
    res.send(error);
  }
};

const downloadTrack = async (req, res) => {
  const { preview_url, name } = req.body;
  const trackPath = path.join(__dirname, '..', '..', downloadDir, `${name}.mp3`);

  try {
    const response = await axios({
      method: 'GET',
      url: preview_url,
      responseType: 'stream'
    });

    response.data.pipe(fs.createWriteStream(trackPath))
      .on('finish', () => res.send({ success: true, path: trackPath }))
      .on('error', (err) => res.send({ success: false, error: err.message }));
  } catch (error) {
    res.send({ success: false, error: error.message });
  }
};

const deleteTrack = (req, res) => {
  const { path } = req.body;

  fs.remove(path, err => {
    if (err) return res.send({ success: false, error: err.message });
    res.send({ success: true });
  });
};

module.exports = {
  getLogin,
  getCallback,
  getSearch,
  postSearch,
  downloadTrack,
  deleteTrack
};
