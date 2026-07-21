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
            type: String,
            required: true,
        },
        publicId:{
            type: String,
            required: true,
        },
    },
    from:{
        type: Date,
    },
    to:{
        type: Date,
    },
    status:{
        type: String,
    },
    country: {
        type: String,
        required: true,
        trim: true,
    },

    city:{
        type: String,
        required: true,
        trim: true,
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