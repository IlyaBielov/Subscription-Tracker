import { Router } from 'express';
import { signIn, singOut, singUp } from "../controllers/auth.controller.js";

const authRoutes = Router();

authRoutes.post('/sign-up', singUp);
authRoutes.post('/sign-in', signIn);
authRoutes.post('/sign-out', singOut);

export default authRoutes;