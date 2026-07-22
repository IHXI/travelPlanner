const Trip = require('../models/trip')
const cloudinary = require('../config/cloudinary')


const uploadImage = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'Travel-Planner/trips',
        resource_type: 'image',
      },
      (error, result) => {
        if (error) {
          reject(error)
        } else {
          resolve(result)
        }
      }
    )

    uploadStream.end(fileBuffer)
  })
}

const showNewForm = async(req,res) =>{
    res.render('trips/new.ejs')
}

const create = async(req, res) =>{
    console.log(req.file)
    /*
     if(!req.file) {
        return res.render('error.ejs', {
            msg:'please select an image.'
        })
    }
        */

    const tripData = {}
    tripData.budget = req.body.budget
    tripData.city = req.body.city
    tripData.country = req.body.country
    tripData.from = req.body.from
    tripData.to = req.body.to
    tripData.status = req.body.status
    tripData.owner = req.session.user._id

    if (req.file) {
    const uploadedImage = await uploadImage(req.file.buffer)
        tripData.image = {
        url: uploadedImage.secure_url,
        publicId: uploadedImage.public_id
    }
    } else {
        tripData.image = {
        url: '/images/planeinsky.webp',
        publicId: 'Travel-Planner/default-trip'
    }}
    
    

    let createdTrip = await Trip.create(tripData)
    res.redirect('/trips')
}

const index = async(req, res) =>{
    let allTrips= await Trip.find().populate('owner')
    res.render('trips/index.ejs', {
        allTrips
    })
}

const show = async(req, res) =>{
    const trip = await Trip.findById(req.params.tripId).populate('owner').populate('notes.author')
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${trip.city},${trip.country}&appid=${process.env.WEATHER_API_KEY}&units=metric`)
    const weather = await response.json()
    console.log(weather)
    res.render('trips/show.ejs', {
        trip,
        weather
    })
}

const editTrip = async (req, res) => {
    const trip = await Trip.findById(req.params.tripId).populate('owner').populate('notes.author')
    res.render('trips/edit.ejs', {
        trip
    })
}

const updateTrip = async (req, res) => {
    try {
    const trip = await Trip.findById(req.params.tripId)

    if (!trip) {
      return res.render('error.ejs', {
        msg: 'Trip not found.'
      })
    }

    if (!trip.owner.equals(req.session.user._id)) {
      return res.render('error.ejs', {
        msg: "You don't have permission to do that."
      })
    }

    const oldPublicId = trip.image?.publicId

    trip.country = req.body.country
    trip.city = req.body.city
    trip.from = req.body.from
    trip.to = req.body.to
    trip.budget = req.body.budget
    trip.status = req.body.status

    if (req.file) {
      const uploadedImage = await uploadImage(req.file.buffer)

      trip.image = {
        url: uploadedImage.secure_url,
        publicId: uploadedImage.public_id
      }
    }

    await trip.save()

    if (req.file && oldPublicId) {
      try {
        await cloudinary.uploader.destroy(oldPublicId, {
          invalidate: true
        })
      } catch (cloudinaryError) {
        console.log('Could not delete the old image:', cloudinaryError)
      }
    }

    res.redirect(`/trips/${trip._id}`)
  } catch (error) {
    console.log(error)

    res.render('error.ejs', {
      msg: 'The trip could not be updated.'
    })
  }
}

const deleteTrip = async(req, res) =>{
    const trip = await Trip.findById(req.params.tripId).populate('owner')

    if (trip.owner.equals(req.session.user._id)){
        await Trip.findByIdAndDelete(req.params.tripId)
        res.redirect('/Trips')
    }else{
        res.render('error.ejs',{
            msg: "you don't have permission to do that"
        }) 
    } 
}

const currencyConverter = async(req, res) => {
    const trip = await Trip.findById(req.params.tripId).populate('owner').populate('notes.author')
    res.render('trips/currencyExchange.ejs', {
        trip
    })
}

module.exports = { 
    showNewForm,
    create,
    index,
    show,
    editTrip,
    updateTrip,
    deleteTrip,
    currencyConverter
}