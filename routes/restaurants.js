const express = require('express');
const router = express.Router();
const Restaurant = require('../models/restaurant');



router.get('/', async (req, res) => {
    const restaurants = await Restaurant.find({});
    res.render('restaurants/index', { restaurants })
});

router.get('/new', (req, res) => {
    res.render('restaurants/new')
})

router.post('/', async (req, res, next) => {

    const restaurant = new Restaurant(req.body.restaurant)
    await restaurant.save()
    req.flash('success', 'Successfully made new restaurant')
    res.redirect(`/restaurants/${restaurant._id}`)
})

//show

router.get('/:id', async (req, res) => {
    const restaurant = await Restaurant.findById(req.params.id).populate('reviews')
    res.render('restaurants/show', { restaurant })
})

//update post get

router.get('/:id/edit', async (req, res) => {
    const restaurant = await Restaurant.findById(req.params.id)
    res.render('restaurants/edit', { restaurant })
})

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const restaurant = await Restaurant.findByIdAndUpdate(id, { ...req.body.restaurant })
    res.redirect(`/restaurants/${restaurant._id}`)
})

//delete post

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await Restaurant.findByIdAndDelete(id)
    res.redirect('/restaurants')
})

module.exports = router;