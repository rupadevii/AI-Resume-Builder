export const initialState = { 
    resumeType: "Experienced",
    personalInfo: {
        name: "",
        summary: "",
        githubURL: "",
        linkedInURL: "",
        email: "",
        phone: "",
        location: ""
    },
    education: [
        {
            school: "",
            degree: "",
            startDate: "",
            endDate: "",
            cgpa: "",
        }
    ],
    workExperience: [
        {
            companyName: "",
            startDate: "",
            endDate: "",
            designation: "",
            desc: "",
            isCurrentCompany: false
        }
    ],
    projects: [
        {
            title: "",
            desc: "",
            technologies: [],
            liveURL: "",
            githubURL: ""
        }
    ],
    skills: {
        technical: [],
        soft: [],
        tools: []
    }
}
