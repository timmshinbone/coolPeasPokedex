const express = require('express')
const router = express.Router()

const pokemonCtrl = require('../controllers/pokemon')

router.get('/:name', pokemonCtrl.show)
router.post('/:battleId', pokemonCtrl.addPokemonToTeam)
// we need 2 bits of info here
// we need the Battle Teams ID
// We also need the pokemon ID
router.delete('/:battleId/:pokemonId', pokemonCtrl.deletePokemonFromTeam)

module.exports = router