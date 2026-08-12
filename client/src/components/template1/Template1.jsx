import PersonalInfo from './PersonalInfo'
import Experience from './Experience'
import Education from './Education'
import Skills from './Skills'
import Projects from './Projects'
import Heading from './Heading'

export default function Template1({data}) {
    return (
        <div className="template">
            <PersonalInfo data={data}/>

            {data.personalInfo?.summary && (
                <div>
                    <Heading label="PROFILE"/>
                    <p className="text-[14px] leading-[1.3]">{data.personalInfo.summary}</p>
                </div>
            )}

            {data.workExperience?.[0]?.designation && (
                <div>
                    <Heading label="PROFESSIONAL EXPERIENCE"/>
                    <Experience data={data}/>
                </div>
            )}

            {data.projects?.[0]?.title && (
                <div>
                    <Heading label="PROJECTS"/>
                    <Projects data={data}/>
                </div>
            )}

            {data.education?.[0]?.school && (
                <div>
                    <Heading label="EDUCATION"/>
                    <Education data={data}/>
                </div>
            )}

            {Object.values(data.skills ?? {}).some(item => item.length > 0) && (
                <div>
                    <Heading label="SKILLS"/>
                    <Skills data={data}/>
                </div>
            )}
        </div>
    )
}