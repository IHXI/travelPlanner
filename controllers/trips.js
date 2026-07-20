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
    const uploadedImage = await uploadImage(req.file.buffer)

    const tripData = {}
    tripData.budget = req.body.budget
    tripData.city = req.body.city
    tripData.country = req.body.country
    tripData.owner = req.session.user._id

    tripData.image = {
        url: uploadedImage.secure_url,
        publicId: uploadedImage.public_id
    }

    let createdTrip = await Trip.create(tripData)
    res.redirect('/trips')
}

const index = async(req, res) =>{
    let allTrips= await Trip.find().populate('owner')
    res.render('trips/index.ejs', {
        allTrips
    })
}

module.exports = { 
    showNewForm,
    create,
    index,

}