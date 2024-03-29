const mongoose = require('mongoose');
const slugify = require('slugify');

const tourSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'A tour must have a name'], unique: true, trim: true, },
    duration: { type: Number, required: [true, 'A tour must have a duration'], },
    maxGroupSize: { type: Number, required: [true, 'A tour must have a group size'], },
    difficulty: { type: String, required: [true, 'A tour must have a difficulty'], },
    ratingsAverage: { type: Number, default: 4.5, },
    ratingsQuantity: { type: Number, default: 0, },
    price: { type: Number, required: [true, 'A tour must have a price'], },
    priceDiscount: Number,
    summary: { type: String, trim: true, required: [true, 'A tour must have a summary'], },
    description: { type: String, trim: true, },
    imageCover: { type: String, required: [true, 'A tour must have an image'], },
    images: [String],
    createdAt: { type: Date, default: Date.now(), selected: false, },
    startDates: [Date],
    secretTour: {
        type: Boolean,
        default: false,

    }

}, {
    toJSON: { virtuals: true, },
    toObject: { virtuals: true, },
});

tourSchema.virtual('durationWeeks').get(function() {
    return this.duration / 7;
})

tourSchema.pre('save', function(next){
    this.slug = slugify(this.name, {lower: true});
    next()
})

// tourSchema.pre('save', function(next){
//     console.log('Will save doc...')
//     next()
// })

// tourSchema.post('save', function(doc, next){
//     console.log(doc)
//     next()
// })

tourSchema.pre('find', function(next){
    this.find( { secretTour: {$ne: true}} )
    
    next()
})


const Tour = mongoose.model('Tour', tourSchema);



module.exports = Tour;