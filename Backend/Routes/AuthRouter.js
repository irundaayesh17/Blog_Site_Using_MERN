import express from 'express';
import { signup, signin, signout } from '../Controllers/Authcontroller.js';

const router = express.Router();

router.post("/signup", signup);

router.post('/signin', signin);

router.post('/signout', signout);

export default router;