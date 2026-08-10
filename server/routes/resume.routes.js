import Router from "express"
import { addResume, deleteResume, editResume, getResumeById, getResumes } from "../controllers/resume.controller.js";

const router = Router()

router.get("/", getResumes)
router.get("/:id", getResumeById)
router.post("/", addResume)
router.patch("/:id", editResume)
router.delete("/:id", deleteResume)

export default router