import { Router } from 'express';

const authRoutes = Router();

authRoutes.post('/sign-up', (req, res) => res.send({title: 'sign-up'}));
authRoutes.post('/sign-in', (req, res) => res.send({title: 'sign-in'}));
authRoutes.post('/sign-out', (req, res) => res.send({ title: 'sign-out' }));

export default authRoutes;