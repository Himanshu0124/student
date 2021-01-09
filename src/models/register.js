const mongoose = require('mongoose');

const clgReg = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    psw:{
        type:String,
        required:true
    }, 
    college:{
        type:String,
        required:true
    },
    contact:{
        type:Number,
        required:true,
        unique:true
    }, 
    city:{
        type:String,
        required:true
    },
    course:{
        type:String,
        required:true
    },
    image:{
        type:String
    }
})

const Register = new mongoose.model("customers" , clgReg);
module.exports = Register;