import express from 'express';
import dotenv from 'dotenv';
import { connect } from 'mongoose';
import { connectDB } from './DB/ConnectDB.js';

import authRoutes from './Routes/AuthRouter.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // to parse the incoming request with JSON payloads

app.get('/', (req, res) => {
    res.send('Hello World124');
});

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log('Server is running on port 3000');
    });

