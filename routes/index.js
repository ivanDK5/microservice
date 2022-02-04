  
const router = require('express').Router();

router.use('/users',require('./users'));
router.use('/documentos',require('./documents'));
router.use('/',require('./auth'))

module.exports = router;