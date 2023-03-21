const router = require('express').Router();
const userRoutes = require('./userRoutes');
const searchRoutes = require('./address');
const favoriteRoutes = require('./favorite');
const commentRoutes = require('./comment');

router.use('/user', userRoutes);
router.use('/address', searchRoutes);
router.use('/favorite', favoriteRoutes);
router.use('/comment', commentRoutes);
module.exports = router;