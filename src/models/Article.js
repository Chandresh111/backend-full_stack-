const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    summary: { type: String, trim: true },
    content: { type: String, trim: true },
    url: { type: String, trim: true },
    imageUrl: { type: String, trim: true },

    topic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Topic',
      required: true,
      index: true,
    },

    sourceName: { type: String, trim: true },
    publishedAt: { type: Date, default: Date.now, index: true },
    readingTimeMinutes: { type: Number, default: 5 },

    tags: [{ type: String }],
  },
  { timestamps: true }
);

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;