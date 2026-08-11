import User from "../models/user.model.js";
import bcrypt from "bcrypt"
import { generateToken } from "../utils/generateToken.js";
const SALT_ROUNDS = 10

export const register = async (req, res) => {
    try {
        const {name, email, password} = req.body
        console.log(name, email, password)

        if(!name || !email || !password){
            return res.status(400).json({message: "Please provide all the required details."})
        }

        let user = await User.findOne({email})

        if(user){
            return res.status(400).json({message: "User already exists."})
        }

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

        user = await User.create({name, email, password: hashedPassword})

        const token = generateToken({id: user._id, email: user.email})

        res
            .status(201)
            .cookie('token', token, {
                maxAge: 7*24*60*60*1000,
                httpOnly: true,
                secure: true,
                sameSite: 'none'
            })
            .json({message: "User created successfully"})

    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Something went wrong", error})
    }   
}

export const login = async (req, res) => {
    try {
        const {email, password} = req.body

        if(!email || !password){
            return res.status(400).json({message: "Please provide all required details."})
        }

        const user = await User.findOne({email})

        if(!user){
            return res.status(404).json({message: "User not found."})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(400).json({message: "Invalid credentials"})
        }

        const token = generateToken({email: user.email, id: user._id})

        res
            .status(201)
            .cookie('token', token, {
                maxAge: 7*24*60*60*1000,
                httpOnly: true,
                secure: true,
                sameSite: 'none'
            })
            .json({message: "User logged in successfully"})

    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Something went wrong", error})
    }
}

export const logout = async (req, res) => {
    try{
        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        });
        
        res.status(200).json({msg: "Logged out successfully."})
    }
    catch(error){
        console.error(error.message);
        res.status(500).json({msg: error.message})
    }
}

export const getMe = async(req, res) => {
    const user = await User.findById(req.user.id)

    if(!user){
        return res.status(404).json({message: "User not found"})
    }

    res.status(200).json({success: true, user: {
        id: user._id,
        name: user.name,
        email: user.email,
    }})
}