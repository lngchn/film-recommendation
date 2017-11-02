const express = require('express');
const router = express.Router();

router.use('/', require('./user'));
router.use('/film', require('./film'));
router.use('/search', require('./search'));
router.use('/user', require('./user'));

module.exports = router;
