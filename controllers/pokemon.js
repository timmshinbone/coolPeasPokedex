// All of the action we are going to be doing are going to be on the BattleTeams model
const BattleTeam = require('../models/battle-team')

function show(req, res, next) {
    // we are going to be searching for the pokemon on their name not id
    fetch(`https://pokeapi.co/api/v2/pokemon/${req.params.name}`)
        .then(res => res.json())
        .then(pokemon => {
            res.render('pokedex/show', {
                pokemon,
                title: 'Pokemon Detail'
            })
        })
        .catch(next)
}

// Add a pokemon to a battle team
// CREATE - CRUD
function addPokemonToTeam(req, res, next) {
    // query for a team to add the pokemon to
    // push my pokemon document into the pokemon field
    // save my document
    // redirect to the battle team that I found and updated

    BattleTeam.findById(req.params.battleId)
        .then(battleTeam => {
            // { name: 'user value' }
            battleTeam.pokemon.push(req.body)

            return battleTeam.save()
        })
        .then(() => res.redirect(`/battle-teams/${req.params.battleId}`))
        .catch(next)
}

// DELETE - CRUD
function deletePokemonFromTeam(req, res, next) {
    // find a battle team
    // check is the current user is that teams owner
    // remove the pokemon from the team
    // save the battle team document after deleting
    // redirect back to the battle team show page

    BattleTeam.findById(req.params.battleId)
        .then(battleTeam => {
            if (!battleTeam.user.equals(req.user._id)) throw new Error('Unauthorized')

            battleTeam.pokemon.id(req.params.pokemonId).deleteOne()
            return battleTeam.save()
        })
        .then(() => res.redirect(`/battle-teams/${req.params.battleId}`))
        .catch(next)
}

module.exports = {
    show,
    addPokemonToTeam,
    deletePokemonFromTeam
}