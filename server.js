require('dotenv').config()
const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const session = require('express-session')
const passport = require('passport')
const methodOverride = require('method-override')

const indexRouter = require('./routes/index')
const battleTeamRouter = require('./routes/battle-teams')
const pokemonRouter = require('./routes/pokemon')

const app = express()

require('./config/database')
require('./config/passport')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(methodOverride('_method'))

app.use(
	session({
		secret: process.env.SECRET,
		resave: false,
		saveUninitialized: true,
	})
)

app.use(passport.initialize())
app.use(passport.session())

app.use(function (req, res, next) {
	res.locals.user = req.user

	next()
})

app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
// prepend the data the we are routing for to this route
app.use('/battle-teams', battleTeamRouter)
app.use('/pokemon', pokemonRouter)

app.use(function (req, res, next) {
	next(createError(404))
})

app.use(function (err, req, res, next) {
	res.locals.message = err.message
	res.locals.error = req.app.get('env') === 'development' ? err : {}

	res.status(err.status || 500)
	res.render('error')
})

module.exports = app
