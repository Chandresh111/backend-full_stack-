const express = require('express');
const readingListController = require('../controllers/readingList.controller');
const { protect } = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(protect);

// GET /api/reading-list
router.get('/', readingListController.getMyReadingList);

// POST /api/reading-list/:articleId  { note? }
router.post('/:articleId', readingListController.saveArticle);

// DELETE /api/reading-list/:articleId
router.delete('/:articleId', readingListController.removeSavedArticle);

module.exports = router;