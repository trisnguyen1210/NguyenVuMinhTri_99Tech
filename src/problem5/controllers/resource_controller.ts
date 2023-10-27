import ResourcesModel from "../models/resources_model";
import express, { Request, Response } from 'express';

export const createResource = async (req: Request, res: Response) => {
    try {
        const resource = new ResourcesModel(req.body);
        await resource.save();
        return res.status(200).json({ message: "success", resource: resource });
    } catch (error) {
        return res.status(500).json({ error: 'Error creating a resource' });
    }
}

export const getAllResource = async (req: Request, res: Response) => {
    // Implement filtering as needed
    try {
        const resources = await ResourcesModel.find();
        return res.status(200).json({ message: "success", resources: resources });
    } catch (error) {
        return res.status(500).json({ error: 'Error get all Resource' });
    }
}

export const getByIDResource = async (req: Request, res: Response) => {
    try {
        const resourceId = req.params.id;
        const resource = await ResourcesModel.findById(resourceId);
        return res.status(200).json({ message: "success", resources: resource });
    } catch (error) {
        return res.status(404).json({ error: 'Resource not found' });
    }
}

export const updateResource = async (req: Request, res: Response) => {
    const resourceId = req.params.id;
    const updatedResource = req.body;
    const resource = await ResourcesModel.findByIdAndUpdate(resourceId, updatedResource, { new: true });
    if (resource) {
        return res.status(200).json({ message: "success", resources: resource });
    } else {
        return res.status(404).json({ error: 'Resource not found' });
    }
}

export const deleteResource = async (req: Request, res: Response) => {
    const resourceId = req.params.id;
    const resource = await ResourcesModel.findByIdAndRemove(resourceId);
    if (resource) {
        return res.status(200).json({ message: "success", resources: resource });
    } else {
        return res.status(404).json({ error: 'Resource not found' });
    }
};
