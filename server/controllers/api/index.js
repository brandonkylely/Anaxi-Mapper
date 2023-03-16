const router = require('express').Router();
const userRoutes = require('./userRoutes');
// const searchRoutes = require('./nearbySearch');

router.use('/user', userRoutes);
// router.use('/search', searchRoutes);
module.exports = router;