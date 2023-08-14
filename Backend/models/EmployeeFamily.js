const mongoose = require('mongoose')

const employeeFamilySchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
    },
    surName:{
        type: String,
        required: true,
    },
    relationshipToEmployee:{
        type: String,
        required: true,
    },
    employee:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',   
        required: true,
    },
    }
)

module.exports = mongoose.model('EmployeeFamily', employeeFamilySchema);
