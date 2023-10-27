import express from 'express';
import mongoose from 'mongoose';
import router from './routers/resourceRoutes';

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'mongodb+srv://trinvm1210:Tri%4012109898@web72.ss2kzgw.mongodb.net/Resources';

// Connect to MongoDB
mongoose.connect(MONGODB_URI);

app.use(express.json());

// Use the resource routes
app.use('/resources', router);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
