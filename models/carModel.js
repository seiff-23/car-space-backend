// require mongoose
const mongoose = require('mongoose')

// define Schema
const Schema = mongoose.Schema

// create car schema

const carSchema = new Schema({
    make: { type: String, required: true },
    model: { type: String, required: true },
    description: { type: String, required: true },
    year: { type: Number, required: true },
    color: { type: String, required: true },
    price: { type: Number, required: true },
    picture: { type: String, required: true },
}, { timestamps: true, collection: 'cars' })


// export car model

module.exports = Car = mongoose.model('Car', carSchema)