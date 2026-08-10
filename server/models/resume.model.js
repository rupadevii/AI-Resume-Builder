import mongoose from "mongoose";

export const resumeSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        default: 'Untitled resume 1'
    },
    data: {
        type: Object,
        required: true
    },
    template: {
        type: String,
        default: 'template1'
    }
})

const Resume = mongoose.model("Resume", resumeSchema)

export default Resume