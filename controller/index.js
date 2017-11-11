const express = require('express');
const router = express.Router();

router.use('/', require('./user'));
router.use('/film', require('./film'));
router.use('/search', require('./search'));

router.use('/recommendation', require('./recommendation'));

module.exports = router;
