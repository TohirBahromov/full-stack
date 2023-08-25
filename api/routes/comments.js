import express from "express";
import { createComment, getComment, deleteComment,updateComment } from "../controllers/comments.js";
const router = express.Router()

// C
router.post("/",createComment)
// R
router.get("/", getComment)
// U
router.put("/", updateComment)
// D
router.delete("/:id", deleteComment)

export default router