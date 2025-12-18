const ReadingList = require('../models/ReadingList');
const Article = require('../models/Article');
const ApiError = require('../utils/ApiError');

const getReadingListForUser = async (userId) => {
  const items = await ReadingList.find({ user: userId })
    .populate({
      path: 'article',
      populate: { path: 'topic', select: 'name slug' },
    })
    .sort({ createdAt: -1 });

  return items;
};

const saveArticleForUser = async ({ userId, articleId, note }) => {
  const article = await Article.findById(articleId);
  if (!article) throw new ApiError(404, 'Article not found');

  const item = await ReadingList.findOneAndUpdate(
    { user: userId, article: articleId },
    { $set: { note } },
    { new: true, upsert: true }
  ).populate({
    path: 'article',
    populate: { path: 'topic', select: 'name slug' },
  });

  return item;
};

const removeSavedArticleForUser = async ({ userId, articleId }) => {
  const result = await ReadingList.findOneAndDelete({
    user: userId,
    article: articleId,
  });

  if (!result) {
    throw new ApiError(404, 'Saved article not found');
  }

  return result;
};

module.exports = {
  getReadingListForUser,
  saveArticleForUser,
  removeSavedArticleForUser,
};