import Router from 'express'
import { refineResume } from '../controllers/ai.controller.js';

const router = Router()

router.post('/refine-resume', refineResume)

export default router