const express = require('express')
const hbs = require('hbs')
const fs = require('fs')
var app = express()

const port = process.env.PORT || 3000

//Hbs setup
hbs.registerPartials(__dirname + '/views/partials')
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
})
hbs.registerHelper('upperCaseAll', (text) => {
    return text.toUpperCase()
})

//Midlewares
app.set('view engine', 'hbs')

app.use((req, res, next) => {
    let now = new Date().toString()
    let log = `${now}: ${req.method} ${req.url}`
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to save log.')
        }

    })
    next()
})

// app.use((req, res, next) => {
//     res.render('maintanance.hbs', {
//         title: 'Something got wrong',
//         message: 'Please visit us later'
//     })
// })

app.use(express.static(__dirname + '/public'))

//Routes
app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMsg: 'Welcome to home page'
    })
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        content: 'Some content'
    })
})

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Portfolio projects'
    })
})

app.get('*', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    })
})


app.listen(port, () => {
    console.log(`Server is up on server ${port}`)
})