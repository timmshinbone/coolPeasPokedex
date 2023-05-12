const express = require('express')
const router = express.Router()
const passport = require('passport')

/* GET home page. */
// READ - Indexing all pokemon
router.get('/', function (req, res, next) {
	fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
		// taking the response from the poke api and changing it to a form we can use => JSON
		.then(res => res.json())
		.then(pokemon => {
			res.render('pokedex/index', {
				// When working with the pokeAPI your data is going to be in the key of results
				pokemon: pokemon.results,
				title: 'Pokedex'
			})
		})
})

router.get(
	'/auth/google',
	passport.authenticate('google', { scope: ['profile', 'email'] })
)

router.get(
	'/oauth2callback',
	passport.authenticate('google', {
		successRedirect: '/',
		failureRedirect: '/',
	})
)

router.get('/logout', function (req, res) {
	req.logout(function () {
		res.redirect('/')
	})
})

module.exports = router
