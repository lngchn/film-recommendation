const express = require('express');
const router = express.Router();

router.use('/', require('./user'));
router.use('/film', require('./film'));
router.use('/search', require('./search'));
router.use('/user', require('./user'));
router.use('/call_film-based_cf', require('./call_film-based_cf'));

module.exports = router;
