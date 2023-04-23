const mongoose = require("mongoose")

const studentSchema = new mongoose.Schema({
    enrollmentNo:Number,
    name:String,
    fatherName:String,
    programme:String,
    batch:Number,
    validUpto:Number,
    dob:String,
    postalAddress:String,
    mobileNo:String,
    checkedAt:[String]
})

module.exports = mongoose.model('Student',studentSchema)