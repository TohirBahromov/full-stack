import express from "express";
import { createLenta, getLenta, updateLenta, deleteLenta } from "../controllers/lentas.js";
const router = express.Router()

// C
router.post("/",createLenta)
// R
router.get("/", getLenta)
// U
router.put("/", updateLenta)
// D
router.delete("/:id", deleteLenta)

export default router