// const mongoose=require('mongoose')
import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    // Schema fields...


    firstName:{
        type:String,
        require:true,
        trim:true,
        min:2,
        max:40
    },
    lastName:{
        type:String,
        require:true,
        trim:true,
        min:2,
        max:40
    },
    username:{
        type:String,
        require:true,
        trim:true,
        unique:true,
        index:true,
        lowercase:true
    },
    email:{
        type:String,
        require:true,
        trim:true,
        unique:true,
        lowercase:true
    },
    hash_password:{
        type:String,
        require:true,
        // min:5,
        // max:30
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'admin'
    },
    contactName:{
        type:String
    },
    profilePicture:{
        type:String
    }





}, { timestamps: true });

// Using a setter to hash the password before saving
userSchema.virtual('password')
    .set(function (password) {
        this.hash_password = bcrypt.hashSync(password, 10);
    });

// Renaming 'method' to 'methods' and adding the 'comparePassword' method
userSchema.methods = {
    comparePassword: function (password) {
        return bcrypt.compareSync(password, this.hash_password);
    }
};

export default mongoose.model('User', userSchema); // Exporting the default model
