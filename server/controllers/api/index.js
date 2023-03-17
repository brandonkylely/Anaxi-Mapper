const router = require('express').Router();
const userRoutes = require('./userRoutes');
const searchRoutes = require('./address');

router.use('/user', userRoutes);
router.use('/address', searchRoutes);
module.exports = router;