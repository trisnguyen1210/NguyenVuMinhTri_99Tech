import mongoose, { Schema, Document } from 'mongoose';

export interface ResourceModel extends Document {
    name: string;
    description: string;
    // Add other fields as needed
}

const ResourceSchema = new Schema<ResourceModel>({
    name: String,
    description: String,
    // Define other fields here
});

export default mongoose.model<ResourceModel>('Resource', ResourceSchema);