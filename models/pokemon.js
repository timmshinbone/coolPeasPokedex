const mongoose = require('mongoose')

const pokemonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = pokemonSchema