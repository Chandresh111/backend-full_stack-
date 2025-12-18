const Article = require('../models/Article');
const Topic = require('../models/Topic');
const ApiError = require('../utils/ApiError');

//fetch list of article 
const getArticles = async ({ topicSlug, search, page = 1, limit = 10 }) => {
  const query = {};

  if (topicSlug) {
    const topic = await Topic.findOne({ slug: topicSlug, isActive: true });
    if (!topic) {
      throw new ApiError(404, 'Topic not found');
    }
    query.topic = topic._id;
  }

  if (search) {
    query.title = { $regex: search, $options: 'i' };
  }

  const skip = (page - 1) * limit;


  //fetch paginated article 
  //count total matching 
  const [items, total] = await Promise.all([
    Article.find(query)
      .populate('topic', 'name slug')
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(limit),
    Article.countDocuments(query),
  ]);

  return {
    items,
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  };
};

const getArticleById = async (id) => {
  const article = await Article.findById(id).populate('topic', 'name slug');
  if (!article) throw new ApiError(404, 'Article not found');
  return article;
};

module.exports = {
  getArticles,
  getArticleById,
};