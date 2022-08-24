import User from "../../models/userModel.js";
import APIFeature from "../../utils/apiFeatures.js";
import catchAsync from "../../utils/catchAsync.js";
import AppError from "../../utils/appError.js";
import jwt from "jsonwebtoken";
import { promisify } from "util";

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPRIES_IN
    })
}
const signup = catchAsync(async(req, res) => {
    const newUser = await User.create(req.body);
    const token = signToken(newUser._id)
    res.status(201).json({
        status: true,
        token,
        data: {
            user: newUser,
            message: "User Created Successfully.",
        },
    });

});
const login = catchAsync(async(req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new AppError("Please provide email and password", 400))
    }
    // 2. check if user exits and password correct
    const user = await User.findOne({ email }).select('+password');
    const correct = user.correctPassword(password, user.password);

    if (!user || !correct) {
        return next(new AppError('Incorrect email or password', 401))
    }
    // 3. everything okay, send token to user
    const token = signToken(user._id);
    res.status(200).json({
        status: true,
        token
    });
});
const protect = catchAsync(async(req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    // 1. Get token check if exits
    if (!token) {
        return next(new AppError('You are not logged in!', '401'));
    }
    // 2. Validate Signature -verification token

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    console.log(decoded);
    // 3. Check user if exits
    // 4. Check if user changed password after the token was issued


})
export {
    signup,
    login,
    protect
}
