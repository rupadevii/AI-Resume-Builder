import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/mongoose.config.js';
import cors from 'cors'
import authRoutes from './routes/auth.routes.js'
import cookieParser from "cookie-parser"

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

app.get("/health", (req, res) => {
    res.json({msg: "Hello from server"})
})

app.listen(process.env.PORT, () => {
    console.log("Server is running on port 5000")
})