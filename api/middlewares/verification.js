import jwt from 'jsonwebtoken';
import { createError } from '../utils/error.js'


export const verifyToken = (req, res, next) => {
    const token = req.cookies['accessToken'];
    if(!token) { return next(createError(401, 'You are not authenticated!'))}
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) { return next(createError(403, 'Invalid Token!'))}
        req.user = user;
        next();
    })
}

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if(req.user.id === req.params.id) { next(); }
        else{ return next(createError(403, 'You are not allowed to perform this action!'))}
    })
}