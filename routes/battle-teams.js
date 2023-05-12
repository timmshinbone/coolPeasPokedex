const express = require('express')
const router = express.Router()

const battleTeamCtrl = require('../controllers/battle-teams')

// localhost:3000/battle-teams/
router.get('/', battleTeamCtrl.index)
router.get('/new', battleTeamCtrl.newBattleTeam)
router.post('/', battleTeamCtrl.create)
// here is where we name our URL params 
// req.params starts as an {}
// req.params { id: 4 } => this value is coming from the url
router.get('/:id', battleTeamCtrl.show)
router.get('/:id/edit', battleTeamCtrl.updateBattleTeamForm)
router.put('/:id', battleTeamCtrl.update)
router.delete('/:id', battleTeamCtrl.deleteBattleTeam)

module.exports = router