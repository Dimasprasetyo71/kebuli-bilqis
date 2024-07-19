
const express = require('express')
const path = require('path')

const port = 2727
const compression = require('compression');
const app = express()

app.set('views', path.join(__dirname, 'views'));
app.use(compression()); 
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Home' 
    })
})

app.listen(port, () => {
    console.log(`Listening at ${port}`)
})