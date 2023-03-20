const router = require('express').Router();
const userRoutes = require('./userRoutes');
const searchRoutes = require('./address');
const favoriteRoutes = require('./favorite');

router.use('/user', userRoutes);
router.use('/address', searchRoutes);
router.use('/favorite', favoriteRoutes);
module.exports = router;