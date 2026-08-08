import PersonalInfo from './PersonalInfo'
import Experience from './Experience'
import Education from './Education'
import Skills from './Skills'
import Projects from './Projects'
import Heading from './Heading'

export default function Template1({data}) {
    return (
        <>
            <PersonalInfo data={data}/>
            {data.personalInfo?.summary && (
                <Heading label={"PROFILE"}/>
            )}
            <div>
                <h3 className=''>
                    {data.personalInfo.summary}
                </h3>
            </div>
            {data.workExperience && data.workExperience[0]?.designation && (
                <div>
                    <Heading label={"PROFESSIONAL EXPERIENCE"}/>
                    <Experience data={data}/>
                </div>
            )}
            {data.projects[0]?.title && (
                <div>
                    <Heading label={"PROJECTS"}/>
                    <Projects data={data}/>
                </div>
            )}
            {data.education[0]?.school && (
                <div>
                    <Heading label={"EDUCATION"}/>
                    <Education data={data}/>
                </div>
            )}
            {Object.values(data.skills).some(item => item.length>0) && (
                <div>
                    <Heading label={"SKILLS"}/>
                    <Skills data={data}/>
                </div>
            )}
        </>
    )
}
