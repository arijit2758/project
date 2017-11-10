/** Requires */
const express = require('express');
const router = express.Router();

// Assigns Routes
router.use('/set', require('./apis/index.js'));

/** Exports */
module.exports = router;