const router = require('express').Router();

const apiRoutes = require('./api');

const authRouter = require('../middleware/auth');

router.use('/auth', authRouter);

router.use('/api', apiRoutes);

module.exports = router;