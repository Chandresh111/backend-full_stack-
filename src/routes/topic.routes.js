const express = require('express');
const topicController = require('../controllers/topic.controller');

const router = express.Router();

router.get('/', topicController.getTopics);

module.exports = router;