import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us your name!']
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    photo: String,
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, "Please confirm your password"],
        validate: {
            validator: function(el) {
                return el === this.password
            }
        },
        message: "Passwords are not same!"
    },
    role_id: {
        type: String,
        required: true,
        default: "2"
    }
});

userSchema.pre("save", async function(next) {
    // Only run this function if password modified
    if (!this.isModified("password")) return next();
    // Hash password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);
    // Delete Password Confirm Field
    this.passwordConfirm = undefined;
    next()
});

userSchema.methods.correctPassword = async function(candidatePw, userPw) {
    return await bcrypt.compare(candidatePw, userPw);
}

const User = mongoose.model("User", userSchema)
export default User;