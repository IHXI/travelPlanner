const mongoose = require('mongoose')
const NoteSchema = new mongoose.Schema({
    text:{
        type: String,
        required: true,
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {timestamps: true})

const tripSchema = new mongoose.Schema({
    budget: {
        type: Number,
        required: true,
        min: 0,
    },
    image: {
        url:{
            type: Number,
            required: true,
        },
        publicId:{
            type: String,
            required: true,
        },
    },

    country: {
        type: String,
        required: true,
    },

    city:{
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    notes: [NoteSchema],
}, {timestamps: true})

const Trip = mongoose.model('Trip', tripSchema)

module.exports = Trip