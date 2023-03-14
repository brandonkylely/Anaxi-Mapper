const express = require('express');
const router = express.Router();

function tmp(req, res) {};

router.post('/signup', tmp);
router.post('/login', tmp);
router.post('/logout', tmp);
router.post('/accessToken', tmp);
router.post('/refreshToken', tmp);

module.exports = router;
