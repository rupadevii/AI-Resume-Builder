import mongoose from "mongoose";

export const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Please provide an email"]
    },
    password: {
        type: String,
        required: [true, "Please provide a password"]
    }
})

const User = mongoose.model("User", userSchema)

export default User