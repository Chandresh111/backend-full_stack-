const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'NewsCurate API root' });
});

router.use('/auth', require('./auth.routes'));
router.use('/topics', require('./topic.routes'));
router.use('/articles', require('./article.routes'));
router.use('/reading-list', require('./readingList.routes'));

module.exports = router;