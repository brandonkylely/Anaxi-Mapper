const router = require('express').Router();

const userRoutes = require('./userRoutes');

router.use('/search', userRoutes);

module.exports = router;