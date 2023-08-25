import express from "express";
import { createClass, getClass, updateClass, deleteClass } from "../controllers/classmates.js";
const router = express.Router()

// C
router.post("/",createClass)
// R
router.get("/", getClass)
// U
router.put("/", updateClass)
// D
router.delete("/:id", deleteClass)

export default router