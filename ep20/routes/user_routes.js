import expesss from "express";
import { getAllUsers, getUserById, postUser, putUser, deleteUser } from "../controllers/user.controller.js";

const router = expesss.Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", postUser);
router.put("/:id", putUser);
router.delete("/:id", deleteUser);

export default router;
