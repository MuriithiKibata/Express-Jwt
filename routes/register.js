const express = require('express');

const app = express();

const router = express.Router();

const handleNewUser = require('../controllers/registerController')

router.post('/', handleNewUser)

module.exports = router;