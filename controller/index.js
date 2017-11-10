const express = require('express');
const router = express.Router();

router.use('/', require('./user'));
router.use('/film', require('./film'));
router.use('/search', require('./search'));

module.exports = router;
