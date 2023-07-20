import Gig from '../models/gig.model.js'
import User from '../models/user.model.js';
import { createError } from '../utils/error.js';

export const getGigs = async (req, res) => {
    const q = req.query
    const filters = {
        ...(q.userId && {userId: q.userId}),
        ...(q.category && {category: q.category}),
        ...((q.min || q.max) && {price: {...(q.min && {$gte: q.min}), ...(q.max && {$lte: q.max}) }}),
        ...(q.search && {title: {$regex: q.search, $options: 'i'}})
    }
    try {
        const gigs = await Gig.find(filters).sort({ [q.sort]: -1});
        res.status(200).json(gigs)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const getGigById = async (req, res, next) => {
    try {
        const gig = await Gig.findById(req.params.id)
        if(!gig) next(createError(404, 'Gig not found!'))
        res.status(200).json(gig);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const createGig = async (req, res, next) => {
    const userId = req.params.userId;
    const newGig = new Gig({...req.body});
    try {
        const savedGig = await newGig.save();
        try {
            await User.findByIdAndUpdate(userId, { $push: {gigs: savedGig._id}})
        } catch (error) {
            next(error)
        }
        res.status(200).json(savedGig);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const deleteGig = async (req, res, next) => {
    const userId = req.params.userId
    try {
        const gig = await Gig.findById(req.params.id);
        if (gig.userId !== userId) {
            return next(createError(403, 'You can delete only your gig!'))
        }
        await Gig.findByIdAndDelete(req.params.id)
        res.status(200).json('Gig has benn deleted.')
    } catch (error) {
        next(error)
    }
}

export const updateGig = async (req, res, next) => {
    const userId = req.params.userId;
    try {
        const gig = await Gig.findById(req.params.id)
        if (gig.userId !== userId) {
            return next(createError(403, 'You can update only your gig!'))
        }
        const updatedGig = await Gig.findByIdAndUpdate(req.params.id, { $set: req.body })
        res.status(200).json(updatedGig)
    } catch (error) {
        next(error)
    }
}