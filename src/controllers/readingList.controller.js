const readingListService = require('../services/readingList.service');

const getMyReadingList = async (req, res, next) => {
  try {
    const items = await readingListService.getReadingListForUser(req.user._id);
    res.json({ success: true, items });
  } catch (err) {
    next(err);
  }
};

const saveArticle = async (req, res, next) => {
  try {
    const item = await readingListService.saveArticleForUser({
      userId: req.user._id,
      articleId: req.params.articleId,
      note: req.body.note,
    });
    res.status(201).json({ success: true, item });
  } catch (err) {
    next(err);
  }
};

const removeSavedArticle = async (req, res, next) => {
  try {
    await readingListService.removeSavedArticleForUser({
      userId: req.user._id,
      articleId: req.params.articleId,
    });
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getMyReadingList,
  saveArticle,
  removeSavedArticle,
};