import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 40
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 40
    },
    // Other fields...

}, { timestamps: true });

userSchema.virtual('password')
    .set(function (password) {
        this.hash_password = bcrypt.hashSync(password, 10);
    });

userSchema.methods = {
    comparePassword: function (password) {
        return bcrypt.compareSync(password, this.hash_password);
    }
};

const User = mongoose.model('User', userSchema);
export default User;
