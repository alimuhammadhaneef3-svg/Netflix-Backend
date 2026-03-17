const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const router = express.Router();

const watchlists = {};
const favorites = {};
const continueWatching = {};

router.use(authMiddleware);

router.get('/watchlist', (req, res) => res.json(watchlists[req.user.id] || []));
router.post('/watchlist', (req, res) => {
  if (!watchlists[req.user.id]) watchlists[req.user.id] = [];
  const { movie } = req.body;
  if (!watchlists[req.user.id].find(m => m.id === movie.id))
    watchlists[req.user.id].push(movie);
  res.json(watchlists[req.user.id]);
});
router.delete('/watchlist/:movieId', (req, res) => {
  if (!watchlists[req.user.id]) watchlists[req.user.id] = [];
  watchlists[req.user.id] = watchlists[req.user.id].filter(m => m.id !== parseInt(req.params.movieId));
  res.json(watchlists[req.user.id]);
});

router.get('/favorites', (req, res) => res.json(favorites[req.user.id] || []));
router.post('/favorites', (req, res) => {
  if (!favorites[req.user.id]) favorites[req.user.id] = [];
  const { movie } = req.body;
  if (!favorites[req.user.id].find(m => m.id === movie.id))
    favorites[req.user.id].push(movie);
  res.json(favorites[req.user.id]);
});
router.delete('/favorites/:movieId', (req, res) => {
  if (!favorites[req.user.id]) favorites[req.user.id] = [];
  favorites[req.user.id] = favorites[req.user.id].filter(m => m.id !== parseInt(req.params.movieId));
  res.json(favorites[req.user.id]);
});

router.get('/continue-watching', (req, res) => res.json(continueWatching[req.user.id] || []));
router.post('/continue-watching', (req, res) => {
  if (!continueWatching[req.user.id]) continueWatching[req.user.id] = [];
  const { movie, progress } = req.body;
  const idx = continueWatching[req.user.id].findIndex(m => m.id === movie.id);
  if (idx >= 0) continueWatching[req.user.id][idx] = { ...movie, progress };
  else continueWatching[req.user.id].unshift({ ...movie, progress });
  res.json(continueWatching[req.user.id]);
});

module.exports = router;