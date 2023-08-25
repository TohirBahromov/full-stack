import express from "express";
import { createAds,getAds,deleteAds } from "../controllers/advs.js";
const router = express.Router()

// C
router.post("/",createAds)
// R
router.get("/", getAds)
// D
router.delete("/:id", deleteAds)

export default router