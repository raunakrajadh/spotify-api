// server/routes/spotifyRoutes.js
const express = require('express');
const { getLogin, getCallback, getSearch, postSearch, downloadTrack, deleteTrack } = require('../controllers/spotifyController');
const router = express.Router();

router.get('/', getLogin);
router.get('/callback', getCallback);
router.get('/search', getSearch);
router.post('/search', postSearch);
router.post('/download', downloadTrack);
router.post('/delete', deleteTrack);

module.exports = router;
