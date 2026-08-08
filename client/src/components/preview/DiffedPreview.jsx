import React from 'react'
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
        <>
        <PersonalInfo data={info}/>
        {info.personalInfo.summary && (
            <>
                <h1 className={name}>PROFILE</h1>
                <Diff string1={info.personalInfo.summary} string2={aiResponse.personalInfo.summary}/>
            </>
        )}
        <div>
        </div>
        {info.workExperience[0].designation && (
            <div>
                <h1 className={name}>PROFESSIONAL EXPERIENCE</h1>
                <>
                    {info.workExperience.map((item, index) => (
                        <div className='mb-2' key={index}>
                            <div className='flex justify-between'>
                                <div className='w-380'>
                                    <h2 className='font-bold'>{item.designation}</h2>
                                    <p className='text-stone-700 italic'>{item.companyName}</p>
                                    <ul className='pl-4'>
                                        {item.desc.split("\n").slice(0).map(item => (
                                            <li className='list-disc'><Diff string1={item} string2={aiResponse.workExperience[index].desc}/></li>
                                        ))}
                                    </ul>
                                </div>
                                <div className='text-sm w-100'>
                                    {item.startDate && (
                                        <span>{formatDate(item.startDate)}</span>
                                    )}
                                    {item.endDate && (
                                        <span>- {formatDate(item.endDate)}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </>
            </div>
        )}
                    
        {info.projects[0].title && (
            <div>
            <h1 className={name}>PROJECTS</h1>
            <>
            {info.projects.map((item, index) => (
                <div key={index}>
                    <div className='flex justify-between'>
                        <div>
                            <span className='font-bold mr-3'>{item.title}</span> 
                            <span className='text-stone-700'>{item.technologies.join(" | ")}</span>
                            <ul className='pl-4'>
                                {item.desc.split("\n").slice(0).map(item => (
                                    <li className='list-disc'>
                                        <Diff string1={item} string2={aiResponse.projects[index].desc}/>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className='flex gap-2'>
                            {item.liveURL && (
                                <a href={item.liveURL}>
                                    <Link size={16}/>
                                </a>
                            )}
                            {item.githubURL && (
                                <a href={item.githubURL}>
                                    <Github size={16}/>
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            ))}     
            </>
            </div>
        )}
        {info.education[0].school && (
            <div>
                <h1 className={name}>EDUCATION</h1>
                <Education data={info}/>
            </div>
        )} 
        {Object.values(info.skills).some(item => item.length>0) && (
            <div>
                <h1 className={name}>SKILLS</h1>
                <Skills data={info}/>
            </div>
        )}
    </> 
    )
}
