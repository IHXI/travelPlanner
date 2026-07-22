const Trip = require('../models/trip.js')

const create = async (req, res) =>{
    const trip = await Trip.findById(req.params.tripId).populate('owner').populate('notes.author')
    const noteData ={}
    noteData.text = req.body.text
    noteData.author = req.session.user._id
    trip.notes.push(noteData)
    await trip.save()
    res.redirect(`/trips/${req.params.tripId}`)
}

const deleteNote = async (req, res) =>{
    const trip = await Trip.findById(req.params.tripId) 
    const note = trip.notes.id(req.params.noteId)

    note.deleteOne()

    await trip.save()
    res.redirect(`/trips/${req.params.tripId}`)
}

module.exports={
    create,
    deleteNote
}