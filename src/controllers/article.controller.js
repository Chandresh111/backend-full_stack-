const articleService = require('../services/article.service'); 

const listArticles = async (req, res, next) => {
  try {
    const { topic, search, page, limit } = req.query;

    const result = await articleService.getArticles({
      topicSlug: topic,
      search,
      page: page ? parseInt(page, 10) : 1,
      limit: limit ? parseInt(limit, 10) : 10,
    });

    // The frontend expects the data array directly, not just the raw result
    // We send back the full result, but the frontend will look for 'items'
    res.json({ success: true, ...result }); 
  } catch (err) {
    next(err);
  }
};

const getArticle = async (req, res, next) => {
  try {
    const article = await articleService.getArticleById(req.params.id);
    res.json({ success: true, article });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  listArticles,
  getArticle,
};