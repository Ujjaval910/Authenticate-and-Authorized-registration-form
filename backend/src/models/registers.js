const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    firstname : {
            type:String,
            required:true
    },
    lastname : {
        type:String,
        required:true
    },
    email : {
        type:String,
        required:true,
        unique:true
    },
    gender : {
        type:String,
        required:true
    },
    phone : {
        type:Number,
        required:true,
        unique:true
    },
    DoB : {
        type:String,
        required:true
    },
    password : {
        type:String,
        required:true
    },
    confirmpassword : {
        type:String,
        required:true
    }
})

const Register = new mongoose.model("register", employeeSchema);

module.exports = Register;