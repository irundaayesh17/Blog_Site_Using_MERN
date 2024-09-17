import express from 'express';
import { signup, signin, signout, verifyEmail, forgotPassword, resetPassword, checkAuth} from '../Controllers/Authcontroller.js';
import { verifytoken } from '../Middleware/verifyToken.js';

const router = express.Router();

router.get("/check-auth", verifytoken, checkAuth);

router.post("/signup", signup);

router.post('/signin', signin);

router.post('/signout', signout);

router.post("/verify-email", verifyEmail);

router.post("/logout", signout);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassword);

export default router;