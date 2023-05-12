

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

module.exports = {
    show
}