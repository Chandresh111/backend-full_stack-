const Topic = require('../models/Topic');

const getTopics = async (req, res, next) => {
  try {
    const topics = await Topic.find({ isActive: true }).sort({ name: 1 });
    res.json({ success: true, topics });
  } catch (err) {
    next(err);
  }
};

module.exports = { getTopics };