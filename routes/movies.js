const express = require('express');
const axios = require('axios');
const router = express.Router();

const TMDB_KEY = '8265bd1679663a7ea12ac168da84d2e8';
const TMDB = 'https://api.themoviedb.org/3';

const tmdb = (path, params = {}) =>
  axios.get(`${TMDB}${path}`, { params: { api_key: TMDB_KEY, ...params } });

router.get('/trending', async (req, res) => {
  try { const { data } = await tmdb('/trending/all/week'); res.json(data); }
  catch { res.status(500).json({ message: 'Error fetching trending' }); }
});

router.get('/originals', async (req, res) => {
  try { const { data } = await tmdb('/discover/tv', { with_networks: 213 }); res.json(data); }
  catch { res.status(500).json({ message: 'Error fetching originals' }); }
});

router.get('/top-rated', async (req, res) => {
  try { const { data } = await tmdb('/movie/top_rated'); res.json(data); }
  catch { res.status(500).json({ message: 'Error fetching top rated' }); }
});

router.get('/action', async (req, res) => {
  try { const { data } = await tmdb('/discover/movie', { with_genres: 28 }); res.json(data); }
  catch { res.status(500).json({ message: 'Error fetching action' }); }
});

router.get('/comedy', async (req, res) => {
  try { const { data } = await tmdb('/discover/movie', { with_genres: 35 }); res.json(data); }
  catch { res.status(500).json({ message: 'Error fetching comedy' }); }
});

router.get('/horror', async (req, res) => {
  try { const { data } = await tmdb('/discover/movie', { with_genres: 27 }); res.json(data); }
  catch { res.status(500).json({ message: 'Error fetching horror' }); }
});

router.get('/romance', async (req, res) => {
  try { const { data } = await tmdb('/discover/movie', { with_genres: 10749 }); res.json(data); }
  catch { res.status(500).json({ message: 'Error fetching romance' }); }
});

router.get('/documentaries', async (req, res) => {
  try { const { data } = await tmdb('/discover/movie', { with_genres: 99 }); res.json(data); }
  catch { res.status(500).json({ message: 'Error fetching documentaries' }); }
});

router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ message: 'Query required' });
    const { data } = await tmdb('/search/multi', { query: q });
    res.json(data);
  } catch { res.status(500).json({ message: 'Error searching' }); }
});

router.get('/details/:type/:id', async (req, res) => {
  try {
    const { type, id } = req.params;
    const { data } = await tmdb(`/${type}/${id}`, { append_to_response: 'videos,credits,similar' });
    res.json(data);
  } catch { res.status(500).json({ message: 'Error fetching details' }); }
});

router.get('/tv/popular', async (req, res) => {
  try { const { data } = await tmdb('/tv/popular'); res.json(data); }
  catch { res.status(500).json({ message: 'Error fetching TV' }); }
});

router.get('/now-playing', async (req, res) => {
  try { const { data } = await tmdb('/movie/now_playing'); res.json(data); }
  catch { res.status(500).json({ message: 'Error fetching now playing' }); }
});

router.get('/upcoming', async (req, res) => {
  try { const { data } = await tmdb('/movie/upcoming'); res.json(data); }
  catch { res.status(500).json({ message: 'Error fetching upcoming' }); }
});

module.exports = router;