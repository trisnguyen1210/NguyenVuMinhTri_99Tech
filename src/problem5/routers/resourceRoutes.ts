import express from "express";
import { createResource, deleteResource, getAllResource, getByIDResource, updateResource } from "../controllers/resource_controller";

const router = express.Router();

router.get("/", getAllResource);
router.post("/create", createResource);
router.put("/:id", updateResource);
router.delete("/:id", deleteResource);
router.get("/:id", getByIDResource);

export default router;