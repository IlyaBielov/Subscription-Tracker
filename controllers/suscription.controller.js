import Subscription from '../models/subscription.model.js';

export const getAllSubscriptions = async (req, res, next) => {
    try {
        const subscriptions = await Subscription.find();

        res.status(200).json({ success: true, data: subscriptions });
    } catch (error) {
        next(error);
    }
};

export const getSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id);

        if (!subscription) {
            const error = new Error(`Subscription with id ${req.params.id} not found`);
            error.status = 404;
            throw error;
        }

        res.status(200).json({ success: true, data: subscription });
    } catch (error) {
        next(error);
    }
};


export const createSubscription = async (req, res, next) => {
    try {
     const subscription = await Subscription.create({
         ...req.body,
         user: req.user._id
     });

     res.status(201).json({ success: true, data: subscription });
    } catch (error) {
        next(error);
    }
};

export const getSubscriptions = async (req, res, next) => {
    try {
        if (req.user.id !== req.params.id) {
            const error = new Error("You are not authorized to access this resource");
            error.status = 401;
            throw error;
        }

        const subscriptions = await Subscription.find({ user: req.params.id });

        res.status(200).json({ success: true, data: subscriptions });
    } catch (error) {
        next(error);
    }
};