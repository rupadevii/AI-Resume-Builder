export const dummyData = {
    resumeType: "Experienced",
    personalInfo: {
        name: "Roald Dahl",
        summary: "Aspiring mern stack devloper proficient in React, node and express.",
        githubURL: "https://github.com/rupadevii",
        linkedInURL: "https://linkedin.com/abcd",
        email: "prarthnaawasthi@gmail.com",
        phone: "2309485230",
        location: "Hyderabad"
    },
    education: [
        {
            school: "XYZ engineering college",
            degree: "Bachelor of Technology",
            startDate: "2021-12",
            endDate: "2025-06",
            cgpa: "0.0",
        },
        {
            school: "PQRS Junior College",
            degree: "Intermediate",
            startDate: "2019-06",
            endDate: "2021-09",
            cgpa: "0.0",
        },
        {
            school: "ABC High School",
            degree: "Secondary School of Certificate",
            startDate: "2014-01",
            endDate: "2019-06",
            cgpa: "0.0",
        }
    ],
    workExperience: [
        {
            companyName: "Techie Gmbh",
            startDate: "2025-01",
            endDate: "2026-05",
            designation: "Frontend Developer",
            desc: "Built a content management system. Integrated API",
            isCurrentCompany: false
        },
        {
            companyName: "Solutions Inc",
            startDate: "2024-06",
            endDate: "2024-12",
            designation: "Frontend developer intern",
            desc: "Built an ecommerce platform for a local store. Increased revenue by 200%",
            isCurrentCompany: false
        }
    ],
    projects: [
        {
            title: "E-commerce Platform",
            desc: "built an ecommerce platform using react and expressjs. Included JWT authentication, payment integration",
            technologies: ["react", "node", "express"],
            liveURL: "ecommerce.vercel.app",
            githubURL: "github.com/e-commerce"
        },
        {
            title: "Content management system",
            desc: "Built a content management system using react and node",
            technologies: ["react", "redux"],
            liveURL: "todo.vercel.app",
            githubURL: "github.com/todo"
        },
        {
            title: "resume builder",
            desc: "Built a resume builder using geminiAPI and react",
            technologies: ["react", "tailwind"],
            liveURL: "resume.vercel.app",
            githubURL: "github.com/resume"
        }
    ],
    skills: {
        technical: ["React", "Javascript", "Node", "Express"],
        soft: ["Communication", "Team"],
        tools: ["git", "github", "postman"]
    }
}