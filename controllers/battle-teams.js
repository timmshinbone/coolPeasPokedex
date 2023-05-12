const battleTeam = require('../models/battle-team')
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

// Renders a form to intake user input information for the team
function newBattleTeam(req, res) {
    res.render('battle-teams/new', { title: 'New Battle Team' })
}

// CREATE - CRUD
function create(req, res, next) {
    // from the session `req.user._id` I would like the `req.body` to have the current signed in user
    // { name: 'some value', user: 'object id value' }
    req.body.user = req.user._id
    BattleTeam.create(req.body)
        .then(() => res.redirect('/battle-teams'))
        .catch(next)
}

// READ - show
function show(req, res, next) {
    // find a single team and render it to a page

    // id - kaleSoup
    // params {} - key/value

    // In the params object there needs to be a key of id
    BattleTeam.findById(req.params.id)
        // () => {}
        .then(battleTeam => {
            res.render('battle-teams/show', {
                battleTeam,
                title: 'Battle Team Details'
            })
        })
        .catch(next)
}

// render a form for us to update a battle team
function updateBattleTeamForm(req, res, next) {
    // find the team that we are going to update
    // then pass that team to the correct view

    BattleTeam.findById(req.params.id)
        .then(battleTeam => {
            res.render('battle-teams/edit', {
                battleTeam,
                title: 'Battle Team Edit Detail'
            })
        })
}

// UPDATE - CRUD
function update(req, res, next) {
    BattleTeam.findById(req.params.id)
    // if the currently signed in user does not own this battle they should not be able to update it
        .then(battleTeam => {
            // since we are comparing object ids we need to use .equals `===` WILL NOT WORK here
            if (!battleTeam.user.equals(req.user._id)) throw new Error('Unauthorized')

            // if the users match update with updateOne method
            return battleTeam.updateOne(req.body)
        })
        .then(() => res.redirect(`/battle-teams/${req.params.id}`))
        .catch(next)
}

// DELETE - CRUD
function deleteBattleTeam(req, res, next) {
    BattleTeam.findById(req.params.id)
        .then(battleTeam => {
            if (!battleTeam.user.equals(req.user._id)) throw new Error('Unauthorized')

            return battleTeam.deleteOne()
        })
        .then(() => res.redirect('/battle-teams'))
        .catch(next)
}

module.exports = {
	index,
	newBattleTeam,
	create,
	show,
	updateBattleTeamForm,
	update,
	deleteBattleTeam,
}