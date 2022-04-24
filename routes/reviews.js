const express = require('express');
const router = express.Router({ mergeParams: true });
const Restaurant = require('../models/restaurant');
const Review = require('../models/review');


router.post('/', async (req, res) => {
    const restaurant = await Restaurant.findById(req.params.id)
    const review = new Review(req.body.review)
    restaurant.reviews.push(review)
    await review.save()
    await restaurant.save()
    res.redirect(`/restaurants/${restaurant._id}`)
})

router.delete('/:reviewId', async (req, res) => {
    const { id, reviewId } = req.params;
    await Restaurant.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })
    await Review.findByIdAndDelete(req.params.reviewId)
    res.redirect(`/restaurants/${id}`)
})

module.exports = router;