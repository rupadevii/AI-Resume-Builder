import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/mongoose.config.js';
import cors from 'cors'
import authRoutes from './routes/auth.routes.js'
import resumeRoutes from './routes/resume.routes.js'
import aiRoutes from './routes/ai.routes.js'
import cookieParser from "cookie-parser"
import { authMiddleware } from './middleware/auth.middleware.js';

dotenv.config({quiet: true})

connectDB()
const app = express()

app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
}))

app.use(cookieParser())

app.use(express.json())
app.use("/auth", authRoutes)
app.use("/resumes", authMiddleware, resumeRoutes)
app.use("/ai", aiRoutes)

app.get("/health", (req, res) => {
    res.json({msg: "Hello from server"})
})

app.listen(process.env.PORT, () => {
    console.log("Server is running on port 5000")
})