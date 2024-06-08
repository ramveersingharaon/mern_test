import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js';
import bcrypt from 'bcrypt'
// import generateToken from '../utils/generateToken.js';
import jwt from 'jsonwebtoken'


//@desc     Auth user/set token
//route     POST /api/users/auth
//@access   Public

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        res.status(401)
        throw new Error("Invalid Email or Password")
    }else{
        const compare = await bcrypt.compare(password, user.password);
        if (compare) {
            // generateToken(req,user._id)
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" })
            res.cookie('jwt', token,
                {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== "development",
                    sameSite: "strict",
                    maxAge: 30 * 24 * 60 * 60 * 1000
                })
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email
            })
        } else {
            res.status(401)
            throw new Error("Invalid Email or Password")
        }
    }
   


})
//@desc     Register a new User
//route     POST /api/users
//@access   Public

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("User already Exists")
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hash });
    if (user) {
        // generateToken(req,user._id)
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" })
        res.cookie('jwt', token,
            {
                httpOnly: true,
                secure: process.env.NODE_ENV !== "development",
                sameSite: "strict",
                maxAge: 30 * 24 * 60 * 60 * 1000
            })
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    } else {
        res.status(400)
        throw new Error("Invalid User Data")
    }
})
//@desc     Logout User
//route     POST /api/users/logout
//@access   Public

const logoutUser = asyncHandler(async (req, res) => {
    res.cookie("jwt","",{
        httpOnly:true,
        expires:new Date(0)
    })
    res.status(200).json({ message: "User logged out" });
})
//@desc     Get user profile
//route     GET/api/users/profile
//@access   Private

const getUserProfile = asyncHandler(async (req, res) => {

    const user = {
        _id : req.user._id,
        name:req.user.name,
        email:req.user.email
    }
    res.status(200).json(user);
})
//@desc     Update user profile
//route     PUT/api/users/profile
//@access   Private

const updateUserProfile = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id);
    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if(req.body.password){
            const hash = await bcrypt.hash(req.body.password, 10);
            
            user.password = hash
        }
        const updateUser = await user.save();
        res.status(200).json({
            _id:updateUser._id,
            name:updateUser.name,
            email:updateUser.email
        })
    }else{
        res.status(404);
        throw new Error("User not Found")
    }

})

export {

    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile

}
