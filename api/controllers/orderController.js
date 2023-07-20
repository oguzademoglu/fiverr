import Gig from "../models/gig.model.js";
import Order from "../models/order.model.js";
import { createError } from "../utils/error.js";

export const getOrders = async (req, res, next) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const createOrder = async (req, res, next) => {
    try {
       const gig =  await Gig.findById(req.params.gigId)
       const newOrder = new Order({
        gigId: gig._id,
        img: gig.cover,
        title: gig.title,
        buyerId: req.userId,
        sellerId: gig.userId,
        price: gig.price,
        payment_intent: 'temporary'
       })
       await newOrder.save();
       res.status(200).json(newOrder)
    } catch (error) {
        next(createError(403, 'error'))
    }

}