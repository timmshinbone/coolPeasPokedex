const express = require('express')
const router = express.Router()

const pokemonCtrl = require('../controllers/pokemon')

router.get('/:name', pokemonCtrl.show)

module.exports = router