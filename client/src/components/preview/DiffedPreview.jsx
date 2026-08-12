import Diff from './Diff'
import Heading from '../template1/Heading'
import { formatDate } from '../../utils/date.util'
import Education from '../template1/Education'
import { Github, Link } from 'lucide-react'
import Skills from '../template1/Skills'
import PersonalInfo from '../template1/PersonalInfo'

export default function DiffedPreview({info, aiResponse, template}) {
    let name;
    if(template === "template1") name="section-title"
    else if(template === "template2") name = "section-title section-title-2"
    else name = "section-title section-title-2 section-title-3"

    return (
        <div>
            <PersonalInfo data={info}/>
            {info.personalInfo.summary && (
                <>
                    <Heading label={"PROFILE"} className={name}/>
                    <p className="text-[14px] leading-[1.3]"><Diff string1={info.personalInfo.summary} string2={aiResponse.personalInfo.summary}/></p>
                </>
            )}
            <div>
            </div>
            {info.workExperience[0].designation && (
                <div>
                    <Heading label={"PROFESSIONAL EXPERIENCE"} className={name}/>
                    <div className="space-y-2.5">
                        {info.workExperience?.map((item, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline gap-4">
                                    <div>
                                        <h2 className="text-[14.0px] font-bold">{item.designation}</h2>
                                        <p className="text-[12.5px] text-stone-700 italic">{item.companyName}</p>
                                    </div>
                                    <div className="text-[12px] text-stone-700 whitespace-nowrap shrink-0">
                                        {item.startDate && <span>{formatDate(item.startDate)}</span>}
                                        {item.endDate && <span> – {formatDate(item.endDate)}</span>}
                                    </div>
                                </div>
                                <ul className="pl-4 mt-0.5">
                                    {item.desc
                                        .split("\n")
                                        .flatMap(line => line.split(/(?<=[.!?])\s+/))
                                        .filter(sentence => sentence.trim().length > 0)
                                        .map((line, idx) => (
                                            <li className="list-disc text-[14px] leading-[1.3]" key={idx}>
                                                <Diff string1={line} string2={aiResponse.workExperience[index].desc}/>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            )}   
                        
            {info.projects[0].title && (
                <div>
                    <Heading className={name} label={"PROJECTS"}/> 
                    <div className="flex flex-col gap-2">
                        {info.projects?.map((item, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-start gap-3">
                                    <p className="text-[14px]">
                                        <span className="font-bold">{item.title}</span>
                                        {item.technologies?.length > 0 && (
                                            <span className="text-stone-700"><i> {"("+ item.technologies.join(", ")+")"}</i></span>
                                        )}
                                    </p>
                                    <div className="flex gap-2 items-center shrink-0 mt-0.5">
                                        {item.liveURL && (
                                            <a href={item.liveURL}><Link size={13}/></a>
                                        )}
                                        {item.githubURL && (
                                            <a href={item.githubURL}><Github size={13}/></a>
                                        )}
                                    </div>
                                </div>
                                <ul className="pl-4 mt-0.5">
                                    {item.desc
                                        .split("\n")
                                        .flatMap(line => line.split(/(?<=[.!?])\s+/))
                                        .filter(sentence => sentence.trim().length > 0)
                                        .map((line, idx) => (
                                            <li className="list-disc text-[14px] leading-[1.3]" key={idx}>
                                                <Diff string1={line} string2={aiResponse.projects[index].desc}/>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        ))}
                    </div>    
                </div>
            )}
            {info.education[0].school && (
                <div>
                    <Heading label={"EDUCATION"} className={name}/>
                    <Education data={info}/>
                </div>
            )} 
            {Object.values(info.skills).some(item => item.length>0) && (
                <div>
                    <Heading className={name} label={"SKILLS"}/>
                    <Skills data={info}/>
                </div>
            )}
        </div> 
    )
}
