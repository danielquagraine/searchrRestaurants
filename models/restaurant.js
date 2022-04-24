const mongoose = require('mongoose');
const review = require('./review');
const Schema = mongoose.Schema;

const RestaurantSchema = new Schema({
    title: String,
    price: String,
    description: String,
    location: String,
    image: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'

        }
    ]
})

RestaurantSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model('Restaurant', RestaurantSchema)