const mongoose = require('mongoose');
const Restaurant = require('../models/restaurant');
const cities = require('./citiesuk');
const places = require('./restaurants');
const images = require('./images')



mongoose.connect('mongodb://localhost:27017/restaurants')
    .then(() => {
        console.log('MONGO CONNECTION OPEN!');
    })
    .catch(err => {
        console.log('MONGO ERROR!');
        console.log(err);
    })


// const deleteDB = async () => {
//     await Restaurant.deleteMany({})
// }

// deleteDB()
//     .then(() => {
//         mongoose.connection.close()
//     })


const seedDB = async () => {

    for (let i = 0; i < 50; i++) {
        const randomcitynum = Math.floor(Math.random() * 2680);
        const r = new Restaurant({
            location: `${cities[randomcitynum].city}, ${cities[randomcitynum].admin_name}`,
            title: `${places[Math.floor(Math.random() * places.length)]}`,
            image: `${images[Math.floor(Math.random() * images.length)]}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tempor commodo ullamcorper a lacus vestibulum sed arcu non. Lacus sed turpis tincidunt id aliquet risus feugiat.'
        })
        await r.save()
    }
}

seedDB()
    .then(() => {
        mongoose.connection.close()
    })