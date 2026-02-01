
const mongoose = require('mongoose')

const StudentSchema = new mongoose.Schema({
   
   
    studentId:{
        type:String,
        required:false
    },
    name:{
        type:String,
        required:false
    },
    className:{
        type:String,
        required:false
    },
    phone:{
        type:String,
        length:10,
        required:false
    },
    isAllowed:{
        type:Boolean,
        default:false
    },
    guardians: [
        {
            name: String,
            relation: String,
            photo:String
        }
    ],
})

const Student = new mongoose.model("student_details",StudentSchema);

module.exports = Student;