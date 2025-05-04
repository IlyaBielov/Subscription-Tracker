import { Router } from 'express';
import authorize from "../middleware/auth.middleware.js";
import {
    createSubscription,
    getAllSubscriptions,
    getSubscription,
    getSubscriptions
} from "../controllers/subscription.controller.js";

const subscriptionRoutes = Router();

subscriptionRoutes.get('/', getAllSubscriptions);

subscriptionRoutes.get('/:id', getSubscription);

subscriptionRoutes.post('/', authorize, createSubscription);

subscriptionRoutes.put('/:id', (req, res) => res.send({ title: 'UPDATE subscription' }));

subscriptionRoutes.delete('/:id', (req, res) => res.send({ title: 'DELETE subscription' }));

subscriptionRoutes.get('/user/:id', authorize, getSubscriptions);

subscriptionRoutes.put('/:id/cancel', (req, res) => res.send({ title: 'CANCEL subscription' }));

subscriptionRoutes.put('/upcoming-renewals', (req, res) => res.send({ title: 'GET upcoming renewals' }));

export default subscriptionRoutes;