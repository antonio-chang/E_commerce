const express = require('express');
const router = express.Router();
const chatsController = require('../Controllers/chatsController');

//[] meaining no auth here
router.get('/getAll', [], chatsController.getAll);

router.post('/add', [], chatsController.add);

router.get('/getNameList', [], chatsController.getNameList);

module.exports = router; 