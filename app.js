const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const session = require('express-session')
const flash = require('connect-flash');
const restaurants = require('./routes/restaurants');
const reviews = require('./routes/reviews');

mongoose.connect('mongodb://localhost:27017/restaurants')
    .then(() => {
        console.log('MONGO CONNECTION OPEN!');
    })
    .catch(err => {
        console.log('MONGO ERROR!');
        console.log(err);
    })


//ejsMate for templating
app.engine('ejs', ejsMate);

app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs');

//parsing body on POST request
app.use(express.urlencoded({ extended: true }))

app.use(methodOverride('_method'))
app.use(express.static('public'))

const sessionConfig = {
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}
app.use(session(sessionConfig))

app.use(flash())

app.use((req, res, next) => {
    res.locals.success = req.flash('success')
    next()
})

app.use('/restaurants', restaurants)
app.use('/restaurants/:id/reviews', reviews)


app.get('/', (req, res) => {
    res.render('home')
});



app.listen(3000, () => {
    console.log("ON PORT 3000")
})