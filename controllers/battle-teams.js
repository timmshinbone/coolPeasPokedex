const BattleTeam = require('../models/battle-team')

// READ - Index
// Get all of the currently signed in users Battle Teams
function index(req, res, next) {
    // In battle-teams there is a field called `user` I want to search to find the user that I am passing in
    BattleTeam.find({ user: req.user._id })
        // () => {}
        .then(battleTeams => {
            // this res.render will be looking for a view to render => from this app check the views folder, inside the views folder there is a folder call battle-teams inside of that folder there is a file called index
            res.render('battle-teams/index', {
                battleTeams,
                title: 'My Battle Teams'
            })
        })
        // If something goes wrong pass it along to the error handler
        .catch(next)
}

function newBattleTeam(req, res) {
    res.render('battle-teams/new', { title: 'New Battle Team' })
}

function create(req, res, next) {
    // from the session `req.user._id` I would like the `req.body` to have the current signed in user
    // { name: 'some value', user: 'object id value' }
    req.body.user = req.user._id
    BattleTeam.create(req.body)
        .then(() => res.redirect('/battle-teams'))
        .catch(next)
}

module.exports = {
    index,
    newBattleTeam,
    create
}