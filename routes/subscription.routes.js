import { Router } from 'express';

const subscriptionRoutes = Router();

subscriptionRoutes.get('/', (req, res) => res.send({ title: 'GET all subscriptions' }));

subscriptionRoutes.get('/:id', (req, res) => res.send({ title: 'GET subscription details' }));

subscriptionRoutes.post('/', (req, res) => res.send({ title: 'CREATE subscription' }));

subscriptionRoutes.put('/:id', (req, res) => res.send({ title: 'UPDATE subscription' }));

subscriptionRoutes.delete('/:id', (req, res) => res.send({ title: 'DELETE subscription' }));

subscriptionRoutes.get('/user/:id', (req, res) => res.send({ title: 'GET all user subscriptions' }));

subscriptionRoutes.put('/:id/cancel', (req, res) => res.send({ title: 'CANCEL subscription' }));

subscriptionRoutes.put('/upcoming-renewals', (req, res) => res.send({ title: 'GET upcoming renewals' }));

export default subscriptionRoutes;