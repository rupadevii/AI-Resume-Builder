import Resume from "../models/resume.model.js";

export const getResumes = async (req, res) => {
    try {
        const resumes = await Resume.find({userId: req.user.id})

        if(resumes.length===0){
            return res.status(404).json({message: "No resumes found"})       
        }

        res.status(200).json({message: "Resumes", resumes})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Something went wrong', error})
    }
}

export const getResumeById = async (req, res) => {
    try {
        const {id} = req.params
    
        const resume = await Resume.findOne({_id: id, userId: req.user.id})
    
        if(!resume){
            return res.status(400).json({message: "No resume found."})
        }
    
        res.status(200).json({message: "Resume", resume})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Something went wrong', error})
    }
}

export const addResume = async (req, res) => {
    try {
        const {data, template, title} = req.body

        if(!data){
            return res.status(400).json({message: "No data provided."})
        }

        console.log(req.user)
        const resume = await Resume.create({
            userId: req.user.id,
            title,
            data,
            template
        })

        res.status(201).json({message: "Resume created successfully", resume})

    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Something went wrong', error})
    }
}

export const editResume = async (req, res) => {
    try {
        const {id} = req.params
    
        const {data, title, template} = req.body

        let updates = {}
        updates.data = data

        if(!data){
            return res.status(200).json({message: "Please provide required data"})
        }

        if(title) updates.title = title
        if(template) updates.template = template
    
        const updatedResume = await Resume.findOneAndUpdate({userId: req.user.id, _id:id}, updates, {returnDocument: 'after'})

        if(!updatedResume){
            return res.status(404).json({message: "Resume not found."})
        }
    
        res.status(200).json({message: "Resume updated successfully", updatedResume})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Something went wrong', error})
    }
}

export const deleteResume = async (req, res) => {
    try {
        const {id} = req.params

        const resume = await Resume.findOneAndDelete({_id:id, userId: req.user.id})

        if(!resume){
            return res.status(404).json({message: "Resume not found."})
        }

        res.status(200).json({message: "Resume deleted successfully"})

    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Something went wrong', error})
    }
}