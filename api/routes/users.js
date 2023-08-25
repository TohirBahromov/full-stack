import express from "express";
import { getUsers, deleteUser, updateUser,} from "../controllers/users.js";
const router = express.Router()

// R
router.get("/", getUsers)
// U
router.put("/", updateUser)
// D
router.delete("/:id", deleteUser)

export default router