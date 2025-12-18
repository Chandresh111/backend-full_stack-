const mongoose = require('mongoose');

const readingListSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    article: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Article',
      required: true,
      index: true,
    },
    note: { type: String, trim: true },
    progress: { type: Number, min: 0, max: 100, default: 0 },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// prevent duplicates (same user saving same article multiple times)
readingListSchema.index({ user: 1, article: 1 }, { unique: true });

const ReadingList = mongoose.model('ReadingList', readingListSchema);

module.exports = ReadingList;