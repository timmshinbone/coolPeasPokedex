const express = require('express')
const router = express.Router()

const battleTeamCtrl = require('../controllers/battle-teams')

// localhost:3000/battle-teams/
router.get('/', battleTeamCtrl.index)
router.get('/new', battleTeamCtrl.newBattleTeam)
router.post('/', battleTeamCtrl.create)

module.exports = router