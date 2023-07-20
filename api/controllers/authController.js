import User from '../models/user.model.js'
import { comparePassword, hashPasword } from '../helpers/authHelper.js';
import jwt from 'jsonwebtoken'


export const register = async (req, res, next) => {
    const hash = await hashPasword(req.body.password)
    const newUser = new User({
        username: req.body.username,
        password: hash,
        email: req.body.email,
        img: req.body.img,
        country: req.body.country,
        phone: req.body.phone,
        desc: req.body.desc,
        isSeller: req.body.isSeller,
    });
    try {
        const existingUser = await User.findOne({username: req.body.username})
        if(existingUser) { return res.status(400).json({message: 'Username already exist!'})}
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    } catch (error) {
        res.status(500).json({message: error.message});
        next(error);
    }
}

export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({username: req.body.username})
        if(!user) {return res.status(400).json({message: 'Username is not registered'})}
        const comparedPassword = await comparePassword(req.body.password, user.password)
        if(!comparedPassword) {
            return res.status(400).json({message: "Password is incorrect!"});
        }
        const token = jwt.sign({id: user._id, isSeller: user.isSeller}, process.env.JWT_SECRET, {expiresIn: '1d'})
        const { password, ...otherDetails } = user._doc;
        res.cookie('accessToken', token, {
            httpOnly: true, // client side cannot access the cookie 
        }).status(200).json({...otherDetails});
    } catch (error) {
        next(error)
    }
}

export const logout = async (req, res, next) => {
    try {
        res.clearCookie('accessToken').status(200).json({message: "Logged out!"});
    } catch (error) {
        next(error);
    }
}