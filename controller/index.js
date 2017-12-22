const express = require('express');

const router = express.Router();

router.use('/', require('./user'));
router.use('/film', require('./film'));
router.use('/search', require('./search'));

router.use('/recommendation', require('./recommendation_user_based'));
router.use('/recommendation', require('./recommendation_item_based'));

module.exports = router;
