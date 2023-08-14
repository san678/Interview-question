const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    code:{
        type: String,
        required: true,
    },
    initials:{
        type: String,
        required: true,
    },
    firstName:{
        type: String,
        required: true,
    },
    surName:{
        type: String,
        required: true,
    },
    address1:{
        type: String,
        required: true,
    },
    address2:{
        type: String,
        required: true,
    },
    dateOfBirth:{
        type: Date,
        dateFormat: 'YYYY-MM-DD',
        required: true,
    },
    status:{
        type:Number,
        required: true,
    },
})

module.exports = mongoose.model('Employee', employeeSchema);