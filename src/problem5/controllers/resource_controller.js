"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteResource = exports.updateResource = exports.getByIDResource = exports.getAllResource = exports.createResource = void 0;
const resources_model_1 = __importDefault(require("../models/resources_model"));
const createResource = async (req, res) => {
    try {
        const resource = new resources_model_1.default(req.body);
        await resource.save();
        return res.status(200).json({ message: "success", resource: resource });
    }
    catch (error) {
        return res.status(500).json({ error: 'Error creating a resource' });
    }
};
exports.createResource = createResource;
const getAllResource = async (req, res) => {
    // Implement filtering as needed
    try {
        const resources = await resources_model_1.default.find();
        return res.status(200).json({ message: "success", resources: resources });
    }
    catch (error) {
        return res.status(500).json({ error: 'Error get all Resource' });
    }
};
exports.getAllResource = getAllResource;
const getByIDResource = async (req, res) => {
    try {
        const resourceId = req.params.id;
        const resource = await resources_model_1.default.findById(resourceId);
        return res.status(200).json({ message: "success", resources: resource });
    }
    catch (error) {
        return res.status(404).json({ error: 'Resource not found' });
    }
};
exports.getByIDResource = getByIDResource;
const updateResource = async (req, res) => {
    const resourceId = req.params.id;
    const updatedResource = req.body;
    const resource = await resources_model_1.default.findByIdAndUpdate(resourceId, updatedResource, { new: true });
    if (resource) {
        return res.status(200).json({ message: "success", resources: resource });
    }
    else {
        return res.status(404).json({ error: 'Resource not found' });
    }
};
exports.updateResource = updateResource;
const deleteResource = async (req, res) => {
    const resourceId = req.params.id;
    const resource = await resources_model_1.default.findByIdAndRemove(resourceId);
    if (resource) {
        return res.status(200).json({ message: "success", resources: resource });
    }
    else {
        return res.status(404).json({ error: 'Resource not found' });
    }
};
exports.deleteResource = deleteResource;
