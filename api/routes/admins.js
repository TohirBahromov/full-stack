import express from "express";
import { createAdmin, updateAdmin, getAdmin, deleteAdmin } from "../controllers/admins.js";
const router = express.Router()

// C
router.post("/",createAdmin)
// R
router.get("/", getAdmin)
// U
router.put("/", updateAdmin)
// D
router.delete("/:id", deleteAdmin)

export default router