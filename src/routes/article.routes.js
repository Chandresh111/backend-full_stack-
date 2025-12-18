const express = require('express');
const articleController = require('../controllers/article.controller');

const router = express.Router();

// GET /api/articles?topic=tech&search=ai&page=1&limit=10
router.get('/', articleController.listArticles);

// GET /api/articles/:id
router.get('/:id', articleController.getArticle);

module.exports = router;