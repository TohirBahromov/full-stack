import express from "express";
import { createAnn, getAnn, updateAnn, deleteAnn } from "../controllers/announcements.js";
const router = express.Router()

// C
router.post("/",createAnn)
// R
router.get("/", getAnn)
// U
router.put("/", updateAnn)
// D
router.delete("/:id", deleteAnn)

export default router