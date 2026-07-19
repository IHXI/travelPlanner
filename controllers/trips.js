const Trip = require('../models/trip')
const cloudinary = require('../config/cloudinary')

const create = async(req,res) =>{
    res.render('new.ejs')
}

module.exports = { 
    create
}