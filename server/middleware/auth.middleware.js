import jwt from "jsonwebtoken"

export const authMiddleware = async(req, res, next) => {
    try{
        const token = req.cookies.token
        console.log(token)

        if(!token){
            return res.status(401).json({msg: "No token provided"})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.user = decoded

        next()
    }catch(error){
        next(error)
    }
}