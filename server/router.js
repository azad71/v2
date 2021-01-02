const router = require('express').Router();

// import routers
const authRouters = require('./routes/auth.route.js');
const postRouters = require('./routes/post.route.js');


router.use('/api', authRouters);
router.use('/api/posts', postRouters);

module.exports = router;