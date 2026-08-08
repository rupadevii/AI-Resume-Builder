import PersonalInfo from '../template1/PersonalInfo'
import Experience from '../template1/Experience'
import Projects from '../template1/Projects'
import Education from '../template1/Education'
import Skills from '../template1/Skills'
import Heading from './Heading'

export default function Template2({data}) {
    return (
        <>
            <PersonalInfo data={data}/>
            {data.personalInfo.summary && (
                <Heading label={"PROFILE"}/>
            )}
            <div>
                <h3 className='text-sm'>
                    {data.personalInfo.summary}
                </h3>
            </div>
            {data.workExperience[0].designation && (
                <div>
                    <Heading label={"PROFESSIONAL EXPERIENCE"}/>
                    <Experience data={data}/>
                </div>
            )}
            {data.projects[0].title && (
                <div>
                    <Heading label={"PROJECTS"}/>
                    <Projects data={data}/>
                </div>
            )}
            {data.education[0].school && (
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
