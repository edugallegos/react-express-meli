import express from "express";
import { getItem, getItems } from "../controllers/items";

const router = express.Router();

router.get("/", getItems);
router.get("/:id", getItem);

export default router;
