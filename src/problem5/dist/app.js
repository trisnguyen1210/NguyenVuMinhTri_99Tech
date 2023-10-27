"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const resourceRoutes_1 = __importDefault(require("./routers/resourceRoutes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'mongodb+srv://trinvm1210:Tri%4012109898@web72.ss2kzgw.mongodb.net/Resources';
// Connect to MongoDB
mongoose_1.default.connect(MONGODB_URI);
app.use(express_1.default.json());
// Use the resource routes
app.use('/resources', resourceRoutes_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
