const mongoose = require('mongoose')
const pokemonSchema = require('./pokemon')

const battleTeamSchema = new mongoose.Schema({
    // the field will be named `name`
    name: {
        // the type will be of a string
        type: String,
        // this will be required in order to make this document
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    pokemon: [pokemonSchema]
},{
    timestamps: true
})

module.exports = mongoose.model('BattleTeam', battleTeamSchema)